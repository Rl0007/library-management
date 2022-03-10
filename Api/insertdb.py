from distutils.log import debug
from urllib import request
from urllib.request import urlopen
from datetime import datetime
from sqlalchemy.orm import relationship,backref
import datetime
from flask import Flask ,request,jsonify
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import or_ ,and_,func,desc,asc,join,union
from flask_cors import CORS,cross_origin
app = Flask(__name__,static_folder='./build',static_url_path='')
CORS(app)
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



class Transaction(db.Model):
    __tablename__='transaction'

    m_id = db.Column(db.Integer, db.ForeignKey('member.id'))
    b_id = db.Column(db.Integer,  db.ForeignKey('book.id'))
    fees = db.Column(db.Integer)
    issuedate = db.Column(MyDateTime )
    returndate = db.Column(MyDateTime )
    status = db.Column(db.String(15),default='unpaid')

    book = relationship(Book, backref=backref("transaction",cascade="all,delete-orphan",overlaps="books,members"),overlaps="books,members")
    member = relationship(Member, backref=backref("transaction",cascade="all,delete-orphan",overlaps="books,members"),overlaps="books,members")
    __table_args__ = (
    db.PrimaryKeyConstraint(
        m_id, b_id,
        ),
    )



data1 = ['Tresco Lavine',
'Deja Kinnison',
'Maude Dieter',
'Maude McPhail',
'Panyin Snider',
'Bajnok McPhail',
'Anar Twomey',
'Lorne Rolle',
'Keyanna Hume',
'Yeshaya Coward',
'Sibley McPhail',
'Udaya Ennis',
'Mohana Duryea',
'Maddy Snider',
'Phedra Hartwig',]

data2=['ashley-iorio@arvinmeritor.info',
'klem-will@progressenergyinc.info',
'ag.lan@autozone-inc.info',
'feli.bu@acusage.net',
'su_ritch@arketmay.com',
'pra.hab@diaperstack.com',
'ha_penl@diaperstack.com',
'narelov@diaperstack.com',
'sarnginle@autozone-inc.info',
'trevel_by@progressenergyinc.info',
'klemens.byram@arvinmeritor.info',
'raffertco@acusage.net',
'shiansoilea@progressenergyinc.info',
'tayl.gu@progressenergyinc.info',
'ag.fishbur@consolidated-farm-research.net']
data4=[]
import random
for i in range(len(data1)):
    id = random.randrange(10000, 100000, 4)
    data4.append(id)
    mem = Member(id=id,name=data1[i],email=data2[i])
    db.session.add(mem)
    db.session.commit()

import random
import time
    
start_date = datetime.date(2022, 1, 1)
end_date = datetime.date(2022, 3, 1)

time_between_dates = end_date - start_date
days_between_dates = time_between_dates.days

 

data3=[676,890,1725,2166,2336,3690,5552,8197,8205,15930,17828,18745,26827,29879,31389,33513,39749,73877,44183,44300]
def addissuebook(data):
    
    if (bool(Member.query.filter_by(id=data['m_id']).first())):
        if(bool(Book.query.filter_by(id=data['b_id']).first())):
            if(bool(Transaction.query.filter(and_(Transaction.b_id==data['b_id'],Transaction.m_id==data['m_id'])).first())):
                return{"610":"book already issued"}
            book = Book.query.filter_by(id=data['b_id']).first()
            if book.stockinlibrary >0 :
                addissuebook = Transaction(m_id= data['m_id'],b_id=data['b_id'],issuedate=data['issuedate'])
                db.session.add(addissuebook)
                db.session.commit()
                book.stockinlibrary = int(book.stockinlibrary) -1 
                db.session.add(book)
                db.session.commit()
                return {"604" : "book issued"}
            else :
                return {"605": "book out of stock"}
        else :
            return{"607":"book not available"}
    else :
        return {"606": "member not available"}

for i in range(44):
    random_number_of_days = random.randrange(days_between_dates)
 
    random_date = start_date + datetime.timedelta(days=random_number_of_days)

    print(type(random_date))
    b_id = random.choice(data3)
    m_id = random.choice(data4)
    data = {"m_id":m_id,"b_id":b_id,'issuedate':random_date}
    toprint = addissuebook(data)
    print(toprint)