
from Api.api import Transaction


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
        print(returnbook.issuedate)
        db.session.add(returnbook)
        db.session.commit()
        book = Book.query.filter_by(id=data['b_id'])
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
    return {"706":"returnbook edited successfully"}

@app.route('/deletereturnbook/<int:m_id>/<int:b_id>')
def deletereturnbook(m_id,b_id):
    m_id = int(m_id)
    b_id = int(b_id)

    Transaction.query.filter_by(m_id = m_id,b_id=b_id).delete()
    db.session.commit()
    # book = Book.query.filter_by(id=b_id).first()
    # book.stockinlibrary +=1
    # db.session.add(book)
    # db.session.commit()
    return{"708": "returnbook deleted successfully"}