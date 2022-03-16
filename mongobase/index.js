const mongoose = require('mongoose')
const { Schema } = mongoose


mongoose.connect(
  'mongodb+srv://mongodb:cwbtDUw64rK7y7sg@cluster0.q19l0.mongodb.net/sample_analytics?retryWrites=true&w=majority'
)

const AccountSchema = new Schema({
  account_id: Number,
  limit: Number,
  products: [String],
}, {
  _id: false,
})

AccountSchema.query.byLimit = function(limit) {
  return this.where({ limit })
};

const Account = mongoose.model('accounts', AccountSchema)

;(async () => {
  // const newAccount = new Account({
  //   account_id: 41,
  //   limit: 42,
  //   products: [
  //     '15',
  //     '44',
  //   ],
  // })
  //
  // const result = await newAccount.save()



  const result = await Account.find().byLimit(42).limit(2).where({
    account_id: 41,
  })

  console.log(result)
})()


module.exports = mongoose



