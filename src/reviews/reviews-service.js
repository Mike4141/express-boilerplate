const UserService = {
  getAll(db) {
    return db("reviews").select("*")
  },

  insert(db, review) {
    return db("reviews").insert(review).returning("*")



  },

   serialize(review)  {
     return review

   }


};





module.exports = UserService;
