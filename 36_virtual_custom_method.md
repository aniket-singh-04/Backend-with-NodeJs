# Virtuals & Custom Methods in Mongoose

## Introduction

Mongoose allows you to add **virtual fields** and **custom methods** to
your schemas.\
These do not exist in the database but behave like real properties or
functions on documents.

------------------------------------------------------------------------

# 🔹 What Are Virtuals?

Virtuals are **computed fields** that are not stored in MongoDB but are
generated when reading documents.

### Example: Full Name Virtual

``` js
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
```

### Usage

``` js
const user = await User.findOne();
console.log(user.fullName);  // "Hello Sir"
```

------------------------------------------------------------------------

# 🔹 Virtual Setter Example

Virtual setters allow you to split input into real fields.

``` js
userSchema.virtual("fullName").set(function (value) {
  const [first, last] = value.split(" ");
  this.firstName = first;
  this.lastName = last;
});
```

### Usage

``` js
const user = new User();
user.fullName = "Hello Sir"; // sets firstName & lastName
```

------------------------------------------------------------------------

# 🔹 Custom Instance Methods

Methods that run on individual documents.

``` js
userSchema.methods.sayHello = function () {
  return `Hello, I am ${this.firstName}`;
};
```

### Usage

``` js
const user = await User.findOne();
console.log(user.sayHello());
```

------------------------------------------------------------------------

# 🔹 Custom Static Methods

Methods called directly on the Model (not the document).

``` js
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};
```

### Usage

``` js
const user = await User.findByEmail("test@example.com");
```

------------------------------------------------------------------------

# Comparison Table

  Feature            Works On   Stored in DB   Usage
  ------------------ ---------- -------------- -------------------------
  Virtual (Getter)   Document   ❌ No          `user.fullName`
  Virtual (Setter)   Document   ❌ No          `user.fullName = "A B"`
  Instance Method    Document   ❌ No          `user.method()`
  Static Method      Model      ❌ No          `User.method()`

------------------------------------------------------------------------

# Summary

-   **Virtuals** create computed properties.\
-   **Custom methods** add reusable logic.\
-   **Instance methods** work on documents.\
-   **Static methods** work on the model itself.



# OR 

```js
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required. Please enter the name."],
      minLength: [3, "Kripaya 3 letters ka naam type kariye"],
      trim: true,
      alias: "nam",
    },
    age: {
      type: Number,
      required: [true, "age field is required. Please enter the age."],
      min: 12,
      validate: {
        validator() {
          return this.age % 2 === 0;
        },
        message: "age can only be an even number.",
      },
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email",
      ],
      lowercase: true,
      trim: true,
    },
    hobbies: [String],
    parentId: {
      type: Schema.Types.ObjectId,
      required: function () {
        return this.age < 16;
      },
      default: null,
      ref: "User",
    },
  },
  {
    strict: "throw",
    timestamps: true,
    virtuals: { // virtual mongoose 
      isAdult: {
        get() {
          return this.age >= 18;
        },
      },
      hobbiesString: {
        get() {
          return this.hobbies.join(", ");
        },
        set(value) {
          this.hobbies = [...this.hobbies, ...value.split(", ")];
        },
      },
    },
    methods: { // custom methods on documents
      getSummary(option) {
        if (option === "full") {
          return `${this.name} is ${this.age} years old and he has these hobbies: ${this.hobbies.join(", ")}.`;
        }
        return `${this.name} is ${this.age} years old.`;
      },
    },
    statics: { // custom method on model 
      findByName(name) {
        return this.find({ name });
      },
      findOneByName(name) {
        return this.findOne({ name });
      },
      findByEmail(email) {
        return this.findOne({ email });
      },
    },
  }
);

userSchema.virtual("emailDomain").get(function () { // virtual Mongoose
  return this.email.split("@")[1];
});

// userSchema.methods.abc = function() { // custom method on document
// }


// userSchema.statics.xyz = function() {  // custom method on model 
// }

const User = model("User", userSchema);

export default User;
```