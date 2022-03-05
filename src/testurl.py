from datetime import datetime
from sqlalchemy.orm import relationship,backref
import datetime
from flask import Flask ,request,jsonify
import json
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
# class Test(db.Model):
#     id = db.Column(db.Integer ,primary_key=True)
#     issue_date = db.Column(db.DateTime )
#     return_date = db.Column(db.DateTime,onupdate=feescal(id) )
#     fees = db.Column(db.String)
# def feescal(id):
#     trans = Test.query.filter_by(id=id).first()
#     issue_date = trans.issue_date
#     return_date = trans.return_date
#     fees = (return_date - issue_date)
#     trans.fees =  fees
#     db.session.add(trans)
#     db.session.commit()
date_and_time = datetime.datetime(2020, 2, 19, 12, 0, 0)
time_change = datetime.timedelta(days=10)
new_time = date_and_time + time_change
class Test(db.Model):
    id = db.Column(db.Integer ,primary_key=True)
    issue_date = db.Column(db.DateTime,default=date_and_time )
    return_date = db.Column(db.DateTime,default = new_time )
    fees = db.Column(db.String ,default= (return_date-issue_date))


    

    

if __name__ == '__main__':
    app.run(debug=True)