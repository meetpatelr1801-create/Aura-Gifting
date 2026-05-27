from flask import (
    Flask,
    request,
    jsonify,
    send_from_directory
)

from flask_mysqldb import MySQL
from flask_cors import CORS

from werkzeug.utils import secure_filename

import bcrypt
import razorpay
import config
import os
from flask_mail import Mail, Message

app = Flask(__name__)

CORS(app)

# ---------------------------------------------------
# Mail Configuration
# ---------------------------------------------------
app.config['MAIL_SERVER'] = config.MAIL_SERVER
app.config['MAIL_PORT'] = config.MAIL_PORT
app.config['MAIL_USERNAME'] = config.MAIL_USERNAME
app.config['MAIL_PASSWORD'] = config.MAIL_PASSWORD
app.config['MAIL_USE_TLS'] = config.MAIL_USE_TLS
app.config['MAIL_USE_SSL'] = config.MAIL_USE_SSL

mail = Mail(app)

# ---------------------------------------------------
# Upload Folder Configuration
# ---------------------------------------------------
UPLOAD_FOLDER = 'uploads'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# ---------------------------------------------------
# MySQL Configuration
# ---------------------------------------------------
app.config['MYSQL_HOST'] = config.MYSQL_HOST
app.config['MYSQL_USER'] = config.MYSQL_USER
app.config['MYSQL_PASSWORD'] = config.MYSQL_PASSWORD
app.config['MYSQL_DB'] = config.MYSQL_DB

mysql = MySQL(app)

# ---------------------------------------------------
# Razorpay Configuration
# ---------------------------------------------------
client = razorpay.Client(
    auth=(
        config.RAZORPAY_KEY_ID,
        config.RAZORPAY_KEY_SECRET
    )
)

# ---------------------------------------------------
# Home Route
# ---------------------------------------------------
@app.route('/')
def home():

    return "Aura Gifting Backend Running Successfully!"


# ---------------------------------------------------
# Register API
# ---------------------------------------------------
@app.route('/api/register', methods=['POST'])
def register():

    try:

        data = request.get_json()

        name = data['name']
        email = data['email']
        password = data['password']

        cursor = mysql.connection.cursor()

        # Check Existing User
        check_query = """
        SELECT * FROM users
        WHERE email = %s
        """

        cursor.execute(check_query, (email,))

        existing_user = cursor.fetchone()

        if existing_user:

            cursor.close()

            return jsonify({
                "message": "Email Already Exists"
            }), 400

        # Hash Password
        hashed_password = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt()
        ).decode('utf-8')

        # Insert User
        insert_query = """
        INSERT INTO users(
            name,
            email,
            password,
            role
        )
        VALUES(%s, %s, %s, %s)
        """

        cursor.execute(insert_query, (
            name,
            email,
            hashed_password,
            "user"
        ))

        mysql.connection.commit()

        cursor.close()

        return jsonify({
            "message": "User Registered Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Login API
# ---------------------------------------------------
@app.route('/api/login', methods=['POST'])
def login():

    try:

        data = request.get_json()

        email = data['email']
        password = data['password']

        cursor = mysql.connection.cursor()

        query = """
        SELECT * FROM users
        WHERE email = %s
        """

        cursor.execute(query, (email,))

        user = cursor.fetchone()

        cursor.close()

        if user:

            stored_password = user[3].encode('utf-8')

            password_match = bcrypt.checkpw(
                password.encode('utf-8'),
                stored_password
            )

            if password_match:

                return jsonify({
                    "message": "Login Successful",
                    "user": {
                        "id": user[0],
                        "name": user[1],
                        "email": user[2],
                        "role": user[4]
                    }
                })

        return jsonify({
            "message": "Invalid Email or Password"
        }), 401

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Razorpay Create Order API
# ---------------------------------------------------
@app.route('/api/create-order', methods=['POST'])
def create_order():

    try:

        data = request.get_json()

        amount = int(data['amount'])

        payment = client.order.create({
            "amount": amount * 100,
            "currency": "INR",
            "payment_capture": 1
        })

        return jsonify(payment)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Save Order API
# ---------------------------------------------------
@app.route('/api/save-order', methods=['POST'])
def save_order():

    try:

        data = request.get_json()

        fullname = data['fullname']
        user_email = data['userEmail']
        phone = data['phone']
        address = data['address']
        total_amount = data['totalAmount']
        cart_items = data['cartItems']

        cursor = mysql.connection.cursor()

        # Save Main Order
        order_query = """
        INSERT INTO orders(
            user_name,
            user_email,
            phone,
            address,
            total_amount,
            payment_status
        )
        VALUES(%s, %s, %s, %s, %s, %s)
        """

        cursor.execute(order_query, (
            fullname,
            user_email,
            phone,
            address,
            total_amount,
            "Paid"
        ))

        mysql.connection.commit()

        order_id = cursor.lastrowid

        # Save Order Items
        for item in cart_items:

            item_query = """
            INSERT INTO order_items(
                order_id,
                product_name,
                quantity,
                price
            )
            VALUES(%s, %s, %s, %s)
            """

            cursor.execute(item_query, (
                order_id,
                item['name'],
                item['quantity'],
                item['price']
            ))

        mysql.connection.commit()

        # -----------------------------------
        # Send Confirmation Email
        # -----------------------------------
        msg = Message(
            'Aura Gifting Order Confirmation',
            sender=config.MAIL_USERNAME,
            recipients=[user_email]
        )

        msg.body = f"""
Hello {fullname},

Your order has been placed successfully!

Order Total: ₹ {total_amount}

Thank you for shopping with Aura Gifting 💖
"""

        mail.send(msg)

        cursor.close()

        return jsonify({
            "message": "Order Saved Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Get Orders API
# ---------------------------------------------------
@app.route('/api/orders', methods=['GET'])
def get_orders():

    try:

        cursor = mysql.connection.cursor()

        query = """
        SELECT * FROM orders
        ORDER BY id DESC
        """

        cursor.execute(query)

        orders = cursor.fetchall()

        cursor.close()

        orders_list = []

        for order in orders:

            orders_list.append({
                "id": order[0],
                "user_name": order[1],
                "user_email": order[2],
                "phone": order[3],
                "address": order[4],
                "total_amount": order[5],
                "payment_status": order[6],
                "created_at": order[7]
            })

        return jsonify(orders_list)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# User Orders API
# ---------------------------------------------------
@app.route('/api/user-orders/<email>', methods=['GET'])
def user_orders(email):

    try:

        cursor = mysql.connection.cursor()

        query = """
        SELECT * FROM orders
        WHERE user_email = %s
        ORDER BY id DESC
        """

        cursor.execute(query, (email,))

        orders = cursor.fetchall()

        cursor.close()

        orders_list = []

        for order in orders:

            orders_list.append({
                "id": order[0],
                "user_name": order[1],
                "user_email": order[2],
                "phone": order[3],
                "address": order[4],
                "total_amount": order[5],
                "payment_status": order[6],
                "created_at": order[7]
            })

        return jsonify(orders_list)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Add Product API
# ---------------------------------------------------
@app.route('/api/add-product', methods=['POST'])
def add_product():

    try:

        data = request.get_json()

        name = data['name']
        price = data['price']
        image = data['image']
        category = data['category']
        description = data['description']

        cursor = mysql.connection.cursor()

        query = """
        INSERT INTO products(
            name,
            price,
            image,
            category,
            description
        )
        VALUES(%s, %s, %s, %s, %s)
        """

        cursor.execute(query, (
            name,
            price,
            image,
            category,
            description
        ))

        mysql.connection.commit()

        cursor.close()

        return jsonify({
            "message": "Product Added Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Get Products API
# ---------------------------------------------------
@app.route('/api/products', methods=['GET'])
def get_products():

    try:

        cursor = mysql.connection.cursor()

        query = """
        SELECT * FROM products
        ORDER BY id DESC
        """

        cursor.execute(query)

        products = cursor.fetchall()

        cursor.close()

        products_list = []

        for product in products:

            products_list.append({
                "id": product[0],
                "name": product[1],
                "price": product[2],
                "image": product[3],
                "category": product[4],
                "description": product[5]
            })

        return jsonify(products_list)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Delete Product API
# ---------------------------------------------------
@app.route('/api/delete-product/<int:id>', methods=['DELETE'])
def delete_product(id):

    try:

        cursor = mysql.connection.cursor()

        query = """
        DELETE FROM products
        WHERE id = %s
        """

        cursor.execute(query, (id,))

        mysql.connection.commit()

        cursor.close()

        return jsonify({
            "message": "Product Deleted Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Update Product API
# ---------------------------------------------------
@app.route('/api/update-product/<int:id>', methods=['PUT'])
def update_product(id):

    try:

        data = request.get_json()

        name = data['name']
        price = data['price']
        image = data['image']
        category = data['category']
        description = data['description']

        cursor = mysql.connection.cursor()

        query = """
        UPDATE products
        SET
            name = %s,
            price = %s,
            image = %s,
            category = %s,
            description = %s
        WHERE id = %s
        """

        cursor.execute(query, (
            name,
            price,
            image,
            category,
            description,
            id
        ))

        mysql.connection.commit()

        cursor.close()

        return jsonify({
            "message": "Product Updated Successfully"
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Upload Image API
# ---------------------------------------------------
@app.route('/api/upload-image', methods=['POST'])
def upload_image():

    try:

        if 'image' not in request.files:

            return jsonify({
                "message": "No Image Uploaded"
            }), 400

        image = request.files['image']

        filename = secure_filename(
            image.filename
        )

        image_path = os.path.join(
            app.config['UPLOAD_FOLDER'],
            filename
        )

        image.save(image_path)

        image_url = (
            f"http://127.0.0.1:5000/uploads/{filename}"
        )

        return jsonify({
            "imageUrl": image_url
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Serve Uploaded Images
# ---------------------------------------------------
@app.route('/uploads/<filename>')
def uploaded_file(filename):

    return send_from_directory(
        app.config['UPLOAD_FOLDER'],
        filename
    )


# ---------------------------------------------------
# Analytics API
# ---------------------------------------------------
@app.route('/api/analytics', methods=['GET'])
def analytics():

    try:

        cursor = mysql.connection.cursor()

        # Total Orders
        cursor.execute(
            "SELECT COUNT(*) FROM orders"
        )

        total_orders = cursor.fetchone()[0]

        # Total Revenue
        cursor.execute(
            "SELECT SUM(total_amount) FROM orders"
        )

        revenue_result = cursor.fetchone()[0]

        total_revenue = (
            revenue_result
            if revenue_result
            else 0
        )

        # Total Products
        cursor.execute(
            "SELECT COUNT(*) FROM products"
        )

        total_products = cursor.fetchone()[0]

        cursor.close()

        return jsonify({
            "totalOrders": total_orders,
            "totalRevenue": total_revenue,
            "totalProducts": total_products
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# ---------------------------------------------------
# Run Server
# ---------------------------------------------------
if __name__ == '__main__':

    app.run(debug=True)