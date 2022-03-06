#   print(db.session.query(Transaction.b_id,func.count(Transaction.b_id).label('book')).group_by(Transaction.b_id).order_by(desc('book')).all())

from urllib import request
from urllib.request import urlopen
from datetime import datetime
from sqlalchemy.orm import relationship,backref
import datetime
from flask import Flask ,request,jsonify
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import or_ ,func,desc,asc
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///book.db'
app.config['SQLALCHEMY_BINDS'] = {
    'member':      'sqlite:///member.db',
    'transaction':  'sqlite:///transaction.db'}
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)

class Book(db.Model):
    __tablename__='book'

    id = db.Column(db.Integer ,primary_key=True)
    title = db.Column(db.String(80))
    isbn = db.Column(db.Integer, unique=True, nullable=False)
    author = db.Column(db.String(80))
    publisher = db.Column(db.String(80))
    stockinlibrary = db.Column(db.Integer )
    totalstock = db.Column(db.Integer )
    # members = relationship("Member",secondary="transaction")


class Member(db.Model):
    __tablename__='member'
    id = db.Column(db.Integer ,primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(80) , unique=True)
    books = relationship("Book",secondary="transaction",overlaps="members")

class MyDateTime(db.TypeDecorator):
    impl = db.DateTime
    
    def process_bind_param(self, value, dialect):
        if type(value) is str:
            return datetime.datetime.strptime(value, '%Y-%m-%d').date()
        return value
# def feescal(id):
#     trans = Transaction.query.filter_by(id=id).first()
#     issue_date = trans.issue_date
#     return_date = trans.return_date
#     fees = (return_date - issue_date)
    


class Transaction(db.Model):
    __tablename__='transaction'

    m_id = db.Column(db.Integer, db.ForeignKey('member.id'))
    b_id = db.Column(db.Integer,  db.ForeignKey('book.id'))
    fees = db.Column(db.Integer)
    issuedate = db.Column(MyDateTime )
    returndate = db.Column(MyDateTime )
    status = db.Column(db.String(15),default='unpaid')

    # @validates('return_date')
    # def check_return(self,key,date)
    book = relationship(Book, backref=backref("transaction",cascade="all,delete-orphan",overlaps="books,members"),overlaps="books,members")
    member = relationship(Member, backref=backref("transaction",cascade="all,delete-orphan",overlaps="books,members"),overlaps="books,members")
    __table_args__ = (
    db.PrimaryKeyConstraint(
        m_id, b_id,
        ),
    )
# # make it run
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

@app.route('/addbookfromapi', methods=['GET', 'POST'])
def apibook():
    data = json.loads(request.data)
    
    no_book = data['noofbooks']
    # no_book = no_book
    print(no_book)
    print(type(no_book[0]))
    if  no_book ==  [' ']:
        no_book =0
    no_book = int(no_book)
    if no_book >= 20:
        no_book = 20

    # no_book = 5
    bookname = data['bookname']
    url = "https://frappe.io/api/method/frappe-library?page=2&title=and"
    response = urlopen(url)
    
    data_json = json.loads(response.read())
    print("hello")
    for bk in range(len(data_json['message'])):
        if bk >= no_book:
            print(1)
            break
            print(2)
        print(type(bookname))
        if bookname == [' ']:
            
            if (Book.query.filter_by(isbn=data_json['message'][bk]['isbn']).first()):
                print(data_json['message'][bk]['isbn'])
                continue
            else :
                addbook = Book(id=data_json['message'][bk]['bookID'],title = data_json['message'][bk]['title'],isbn=data_json['message'][bk]['isbn'],author=data_json['message'][bk]['authors'],publisher=data_json['message'][bk]['publisher'],stockinlibrary= 0,totalstock=0)
                print(data_json['message'][bk]['authors'])
                db.session.add(addbook)
                db.session.commit()
        # if bookname[0] != ' ':
        #     print("inside second if")
        #     print(type(data_json['message'][bk]['title']))
        #     if ( bookname[0]==data_json['message'][bk]['title'] ) :
        #         print("whatsapp")
        #         if (Book.query.filter_by(isbn=data_json['message'][bk]['isbn']).first()):
        #             print("yo")
        #             continue
        #         else :
        #             addbook = Book(title = data_json['message'][bk]['title'],isbn=data_json['message'][bk]['isbn'],author=data_json['message'][bk]['authors'],publisher=data_json['message'][bk]['publisher'],stockinlibrary= 0,totalstock=0)
        #             db.session.add(addbook)
        #             db.session.commit()

   
    return {"208" : "book added from api"}

#issuebook backend


def issuebook_searializer(transaction):
    return {
        "m_id" : transaction.m_id,
      "b_id": transaction.b_id,
      "issuedate": transaction.issuedate
    }

@app.route('/addissuebook', methods=['GET', 'POST'])
def addissuebook():
    data = json.loads(request.data)
    print(data['m_id'])
    if (bool(Member.query.filter_by(id=data['m_id']).first())):
        book = Book.query.filter_by(id=data['b_id']).first()
        if book.stockinlibrary >0 :
            addissuebook = Transaction(m_id= data['m_id'],b_id=data['b_id'],issuedate=data['issuedate'])
            db.session.add(addissuebook)
            db.session.commit()
            book.stockinlibrary = int(book.stockinlibrary) -1 
            db.session.add(book)
            db.session.commit()
            return {"604" : "book issued "}
        else :
            return {"605": "book out of stock"}
    else :
        return {"606": "member not available"}

@app.route('/showissuebook')
def issuebookshow():
    allissuebooks = Transaction.query.all()
    datatosend = jsonify([*map(issuebook_searializer,allissuebooks)])
    return datatosend

@app.route('/editissuebook', methods=['GET', 'POST'])
def editissuebook():
    data = json.loads(request.data)
    print(data['m_id'])
    issuebook = Transaction.query.filter_by(m_id=data['m_id'], b_id=data['b_id']).first()
    issuebook.b_id = data['b_id']
    issuebook.issuedate = data['issuedate']
    db.session.add(issuebook)
    db.session.commit()
    return {"606":"issuebook edited successfully"}

@app.route('/deleteissuebook/<int:m_id>/<int:b_id>')
def deleteissuebook(m_id,b_id):
    m_id = int(m_id)
    b_id = int(b_id)
    trans = Transaction.query.filter_by(m_id = m_id,b_id=b_id).first()
    if trans.status == "paid":
        Transaction.query.filter_by(m_id = m_id,b_id=b_id).delete()
        db.session.commit()
        # book = Book.query.filter_by(id=b_id).first()
        # book.stockinlibrary +=1
        # db.session.add(book)
        # db.session.commit()
        return{"608": "issuebook deleted successfully"}
    else :
        return {"609":"book status is unpaid cannot delete"}
# return bookbackend]



def returnbook_searializer(transaction):
    return {
        "m_id" : transaction.m_id,
      "b_id": transaction.b_id,
      "issuedate": transaction.issuedate,
      "returndate": transaction.returndate,
      "fees": transaction.fees,
      "status": transaction.status
    }

@app.route('/addreturnbook', methods=['GET', 'POST'])
def addreturnbook():
    data = json.loads(request.data)
    print(data['m_id'])
    if (bool(Transaction.query.filter_by(m_id=data['m_id'],b_id=data['b_id']).first())):
        returnbook = Transaction.query.filter_by(m_id=data['m_id'],b_id=data['b_id']).first()
        returnbook.returndate= data['returndate']
        db.session.add(returnbook)
        db.session.commit()
        returnbook = Transaction.query.filter_by(m_id=data['m_id'],b_id=data['b_id']).first()
        feesdate = returnbook.returndate-returnbook.issuedate       
        print(feesdate.days*5)
        returnbook.fees = int(feesdate.days*5)
        db.session.add(returnbook)
        db.session.commit()
        book = Book.query.filter_by(id=data['b_id']).first()
        book.stockinlibrary +=1
        db.session.add(book)
        db.session.commit()
        return{"704":"book  returned"}
    else :
        return {"705":"no trasaction found"}


@app.route('/showreturnbook')
def returnbookshow():
    allreturnbooks = Transaction.query.all()
    datatosend = jsonify([*map(returnbook_searializer,allreturnbooks)])
    return datatosend

@app.route('/editreturnbook', methods=['GET', 'POST'])
def editreturnbook():
    data = json.loads(request.data)
    print(data['m_id'])
    returnbook = Transaction.query.filter_by(m_id=data['m_id'], b_id=data['b_id']).first()
    returnbook.status = data['status']
    returnbook.returndate = data['returndate']
    db.session.add(returnbook)
    db.session.commit()
    returnbook = Transaction.query.filter_by(m_id=data['m_id'],b_id=data['b_id']).first()
    feesdate = returnbook.returndate-returnbook.issuedate       
    returnbook.fees = int(feesdate.days*5)
    db.session.add(returnbook)
    db.session.commit()
    return {"706":"returnbook edited successfully"}

@app.route('/deletereturnbook/<int:m_id>/<int:b_id>')
def deletereturnbook(m_id,b_id):
    m_id = int(m_id)
    b_id = int(b_id)
    trans = Transaction.query.filter_by(m_id = m_id,b_id=b_id).first()
    if trans.status == "paid":
        Transaction.query.filter_by(m_id = m_id,b_id=b_id).delete()
        db.session.commit()
        # book = Book.query.filter_by(id=b_id).first()
        # book.stockinlibrary +=1
        # db.session.add(book)
        # db.session.commit()
        return{"708": "returnbook deleted successfully"}
    else :
        return{"709": "book status is unpaid cannot delete"}


#search backend

@app.route('/search/<string:word>', methods=['GET','POST'])
def search(word):
    # data = json.loads(request.data)
    # print(data)
    # word = data['word1']
    print(word)
    allbooks = Book.query.filter(or_(Book.title.like("%"+word+"%") , Book.author.like("%"+word+"%"))).all()
    for books in allbooks:
        print(books.title)
    datatosend = jsonify([*map(book_searializer,allbooks)])
    return datatosend


# tools backend

@app.route('/popularbook')
def popularbook():
    val = db.session.query(Transaction.b_id.label('b_id'),func.count(Transaction.b_id).label('countbook')).group_by(Transaction.b_id).order_by(desc('countbook')).first()
    print(val.b_id)
    book = Book.query.filter_by(id=val.b_id).all()
    datatosend = jsonify([*map(book_searializer,book)])
    return datatosend
#  print(db.session.query(Transaction.m_id.label('m_id'),func.sum(Transaction.fees).label("fees")).group_by('m_id').all())
@app.route('/highcust')
def highcust():
    val = db.session.query(Transaction.m_id.label('m_id'),func.sum(Transaction.fees).label("fees")).group_by('m_id').order_by(desc('fees')).first()
    mem = Member.query.filter_by(id=val.m_id).all()
    datatosend = jsonify([*map(member_searializer,mem)])
    return datatosend
# def transaction_searializer(transaction):
#     return {
#         "t_id" : transaction.t_id,
#         "book_isbn" : transaction.book_isbn,
#         "fees": transaction.fees,
#         'status': transaction.status,
#         'm_id': transaction.m_id,
#         'issue_date': transaction.issue_date,
#         'return_date' :  transaction.return_date
#     }

# @app.route('/transaction', methods=['GET', 'POST'])
# def addtransaction():
#     data = json.loads(request.data)
#     print(data['m_id'])
#     addtransaction = Transaction(t_id=data['t_id'],m_id = data['m_id'],book_isbn=data['book_isbn'],fees=data['fees'],status=data['status'],issue_date=data['issue_date'],return_date=data['return_date'])
#     db.session.add(addtransaction)
#     db.session.commit()
#     return {"204" : "transaction added"}

# @app.route('/showtransaction')
# def transactionshow():
#     alltransactions = Transaction.query.all()
#     datatosend = jsonify([*map(transaction_searializer,alltransactions)])
#     return datatosend

# @app.route('/edittransaction', methods=['GET', 'POST'])
# def edittransaction():
#     data = json.loads(request.data)
#     print(data['t_id'])
#     transaction = Transaction.query.filter_by(t_id=data['t_id']).first()
#     transaction.book_isbn = data['book_isbn']
#     transaction.m_id = data['m_id']
#     transaction.fees= data['fees']
#     transaction.status = data['status']
#     transaction.issue_date = data['issue_date']
#     transaction.return_date = data['return_date']

#     db.session.add(transaction)
#     db.session.commit()
#     return {"206":"transaction edited successfully"}

# @app.route('/deletetransaction/<int:t_id>')
# def deletetransaction(t_id):
#     t_id = int(t_id)
#     Transaction.query.filter_by(t_id = t_id).delete()
#     db.session.commit()
#     return{"208": "transaction deleted successfully"}



if __name__ == '__main__':
    app.run(debug=True)