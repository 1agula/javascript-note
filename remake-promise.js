function Promise(executor) {
  const self = this;
  this.promiseState = "pending";
  this.promiseResult = null;
  this.callbacks = [];

  function resolve(data) {
    if (self.promiseState !== "pending") return;
    self.promiseState = "fullfilled";
    self.promiseResult = data;
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onResolved(data);
      });
    });
  }
  function reject(data) {
    if (self.promiseState !== "pending") return;
    self.promiseState = "rejected";
    self.promiseResult = data;
    setTimeout(() => {
      self.callbacks.forEach((item) => {
        item.onRejected(data);
      });
    });
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;

  if (typeof onResolved !== "function") {
    onResolved = (value) => value;
  }

  if (typeof onRejected !== "function") {
    onRejected = (reason) => {
      throw reason;
    };
  }

  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let result = type(self.promiseResult);
        if (result instanceof Promise) {
          result.then(
            (v) => resolve(v),
            (r) => reject(r)
          );
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    }
    if (this.promiseState === "fullfilled") {
      setTimeout(() => {
        callback(onResolved);
      });
    }
    if (this.promiseState === "rejected") {
      setTimeout(() => {
        callback(onRejected);
      });
    }
    if (this.promiseState === "pending") {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved);
        },
        onRejected: function () {
          callback(onRejected);
        },
      });
    }
  });
};

Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected);
};

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(
        (v) => resolve(v),
        (r) => reject(r)
      );
    } else {
      resolve(value);
    }
  });
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

Promise.all = function (promises) {
  let count = 0;
  let arr = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          count++;
          arr[i] = v;
          if (count === promises.length) {
            resolve(arr);
          }
        },
        (r) => {
          reject();
        }
      );
    }
  });
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (v) => {
          resolve(arr);
        },
        (r) => {
          reject();
        }
      );
    }
  });
};
