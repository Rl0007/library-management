from flask import *
from flask_sqlalchemy import SQLAlchemy
import datetime
from datetime import date, timedelta

from sqlalchemy import func
app = Flask(__name__)
db = SQLAlchemy(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sub1.db'

class MyDateTime(db.TypeDecorator):
    impl = db.DateTime
    
    def process_bind_param(self, value, dialect):
        if type(value) is str:
            return datetime.datetime.strptime(value, '%Y-%m-%d')
        return value
def fees(iss,ret):
    delta = iss-ret
    return delta.days
class sub1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    issuedate = db.Column(MyDateTime)
    returndate = db.Column(MyDateTime)

    fees = db.Column(db.String,default=fees(issuedate,returndate))


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/add', methods=['GET', 'POST'])
def addsub():
    if request.method == "POST":
        iss = request.form['iss']
        ret = request.form['ret']
        sub = sub1(issuedate=iss,returndate=ret)
        db.session.add(sub)
        db.session.commit()
    return {"hello":"one"}

if __name__ == '__main__':
    app.run(debug=True)