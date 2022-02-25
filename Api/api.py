from urllib import request

from flask import Flask ,request,jsonify
import json
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///book.db'
db = SQLAlchemy(app)

class Book(db.Model):
    id = db.Column(db.Integer ,primary_key=True)
    title = db.Column(db.String(80))
    isbn = db.Column(db.Integer, unique=True, nullable=False)
    author = db.Column(db.String(80))
    publisher = db.Column(db.String(80))



@app.route('/')
def hello():
    return {"201":'Hello World!'}

def book_searializer(book):
    return {
        "id" : book.id,
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

@app.route('/editbook', methods=['GET', 'POST'])
def editbook():
    data = json.loads(request.data)
    print(data['id'])
    book = Book.query.filter_by(id=data['id']).first()
    book.isbn = data['isbn']
    book.title = data['title']
    book.author= data['author']
    book.publisher = data['publisher']
    db.session.add(book)
    db.session.commit()
    return {"206":"book edited successfully"}

@app.route('/deletebook/<int:id>')
def deletebook(id):
    id = int(id)
    Book.query.filter_by(id = id).delete()
    db.session.commit()
    return{"208": "book deleted successfully"}

if __name__ == '__main__':
    app.run(debug=True)