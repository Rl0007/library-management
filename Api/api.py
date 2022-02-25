from urllib import request

from flask import Flask ,request,jsonify
import json
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///book.db'
app.config['SQLALCHEMY_BINDS'] = {
    'member':      'sqlite:///member.db'}

db = SQLAlchemy(app)

class Book(db.Model):
    id = db.Column(db.Integer ,primary_key=True)
    title = db.Column(db.String(80))
    isbn = db.Column(db.Integer, unique=True, nullable=False)
    author = db.Column(db.String(80))
    publisher = db.Column(db.String(80))
    stockinlibrary = db.Column(db.Integer )
    totalstock = db.Column(db.Integer )


class Member(db.Model):
    id = db.Column(db.Integer ,primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(80) , unique=True)
    
## Member backend


def member_searializer(member):
    return {
        "id" : member.id,
      "name": member.name,
      "email": member.email
    }

@app.route('/member', methods=['GET', 'POST'])
def addmember():
    data = json.loads(request.data)
    print(data['name'])
    addmember = Member(id= data['id'],name=data['name'],email=data['email'])
    db.session.add(addmember)
    db.session.commit()
    return {"304" : "member added"}

@app.route('/showmember')
def membershow():
    allmembers = Member.query.all()
    datatosend = jsonify([*map(member_searializer,allmembers)])
    return datatosend

@app.route('/editmember', methods=['GET', 'POST'])
def editmember():
    data = json.loads(request.data)
    print(data['id'])
    member = Member.query.filter_by(id=data['id']).first()
    member.name = data['name']
    member.email = data['email']
    db.session.add(member)
    db.session.commit()
    return {"306":"member edited successfully"}

@app.route('/deletemember/<int:id>')
def deletemember(id):
    id = int(id)
    Member.query.filter_by(id = id).delete()
    db.session.commit()
    return{"308": "member deleted successfully"}

@app.route('/')
def hello():
    return {"201":'Hello World!'}


#Book backend


def book_searializer(book):
    return {
        "id" : book.id,
        "isbn" : book.isbn,
        "author": book.author,
        'publisher': book.publisher,
        'title': book.title,
        'stockinlibrary': book.stockinlibrary,
        'totalstock' :  book.totalstock
    }

@app.route('/book', methods=['GET', 'POST'])
def addbook():
    data = json.loads(request.data)
    print(data['title'])
    addbook = Book(title = data['title'],isbn=data['isbn'],author=data['author'],publisher=data['publisher'],stockinlibrary=data['stockinlibrary'],totalstock=data['totalstock'])
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
    book.stockinlibrary = data['stockinlibrary']
    book.totalstock = data['totalstock']

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