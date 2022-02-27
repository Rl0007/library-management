def transaction_searializer(transaction):
    return {
        "t_id" : transaction.t_id,
        "book_isbn" : transaction.book_isbn,
        "fees": transaction.fees,
        'status': transaction.status,
        'm_id': transaction.m_id,
        'issue_date': transaction.issue_date,
        'return_date' :  transaction.return_date
    }

@app.route('/transaction', methods=['GET', 'POST'])
def addtransaction():
    data = json.loads(request.data)
    print(data['m_id'])
    addtransaction = Transaction(t_id=data['t_id'],m_id = data['m_id'],book_isbn=data['book_isbn'],fees=data['fees'],status=data['status'],issue_date=data['issue_date'],return_date=data['return_date'])
    db.session.add(addtransaction)
    db.session.commit()
    return {"204" : "transaction added"}

@app.route('/showtransaction')
def transactionshow():
    alltransactions = Transaction.query.all()
    datatosend = jsonify([*map(transaction_searializer,alltransactions)])
    return datatosend

@app.route('/edittransaction', methods=['GET', 'POST'])
def edittransaction():
    data = json.loads(request.data)
    print(data['t_id'])
    transaction = Transaction.query.filter_by(t_id=data['t_id']).first()
    transaction.book_isbn = data['book_isbn']
    transaction.m_id = data['m_id']
    transaction.fees= data['fees']
    transaction.status = data['status']
    transaction.issue_date = data['issue_date']
    transaction.return_date = data['return_date']

    db.session.add(transaction)
    db.session.commit()
    return {"206":"transaction edited successfully"}

@app.route('/deletetransaction/<int:t_id>')
def deletetransaction(t_id):
    t_id = int(t_id)
    Transaction.query.filter_by(t_id = t_id).delete()
    db.session.commit()
    return{"208": "transaction deleted successfully"}
