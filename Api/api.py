from urllib import request

from flask import Flask ,request,jsonify
import json
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///book.db'
db = SQLAlchemy(app)

class Book(db.Model):
    title = db.Column(db.String(80))
    isbn = db.Column(db.Integer, unique=True, primary_key=True, nullable=False)
    author = db.Column(db.String(80))
    publisher = db.Column(db.String(80))



@app.route('/')
def hello():
    return {"201":'Hello World!'}

def book_searializer(book):
    return {
        "isbn" : book.isbn,
        "author": book.author,
        'publisher': book.publisher,
        'title': book.title
    }

@app.route('/book', methods=['GET', 'POST'])
def addbook():
    data = json.loads(request.data)
    print(data['title'])
    addbook = Book(title = data['title'],isbn=data['isbn'],author=data['author'],publisher=data['publisher'])
    db.session.add(addbook)
    db.session.commit()
    return {"204" : "book added"}

@app.route('/showbook')
def bookshow():
    allbooks = Book.query.all()
    datatosend = jsonify([*map(book_searializer,allbooks)])
    return datatosend

if __name__ == '__main__':
    app.run(debug=True)