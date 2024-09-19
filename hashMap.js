class HashNode {
  data;
  key;
  next;
  constructor(data, key) {
    this.data = data;
    this.key = key;
    this.next = null;
  }
}

class HashMap {
  #size;
  #bucket;
  length;
  #loadFactor;
  constructor() {
    this.#size = 16;
    this.length = 0;
    this.#bucket = new Array(this.#size).fill(null);
    this.#loadFactor = 0.8;
  }
  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.#size;
    }
    return hashCode;
  }

  set(key, value) {
    const node = new HashNode(value, key);
    const hashKey = this.#hash(key);
    if (this.#bucket[hashKey] === null) {
      this.#bucket[hashKey] = node;
    } else {
      let curr = this.#bucket[hashKey];
      while (curr !== null) {
        if (key === curr.key) {
          curr.data = value;

          break;
        }
        if (curr.next === null) curr.next = node;
        curr = curr.next;
      }
    }
    this.#populate();
    this.#increaseLength();
  }
  #populate() {
    if (this.length >= Math.ceil(this.#size * this.#loadFactor)) {
      this.#size = this.#size * 2;
      const newBucket = new Array(this.#size).fill(null);
      this.#bucket.forEach((node) => {
        let curr = node;
        while (curr !== null) {
          const hashKey = this.#hash(curr.key);
          if (newBucket[hashKey] !== null) {
            let currNode = newBucket[hashKey];
            while (currNode.next !== null) {
              currNode = currNode.next;
            }
            currNode.next = new HashNode(curr.data, curr.key);
          } else {
            newBucket[hashKey] = new HashNode(curr.data, curr.key);
          }
          curr = curr.next;
        }
      });

      this.#bucket = newBucket;
    }
  }

  get(key) {
    const hashKey = this.#hash(key);
    let curr = this.#bucket[hashKey];
    while (curr !== null) {
      if (curr.key === key) return curr.data;
      curr = curr.next;
    }
    return null;
  }

  has(key) {
    const hashKey = this.#hash(key);
    let curr = this.#bucket[hashKey];
    while (curr !== null) {
      if (curr.key === key) return true;
      curr = curr.next;
    }
    return false;
  }

  remove(key) {
    const hashKey = this.#hash(key);
    let curr = this.#bucket[hashKey];
    let secondTolast = this.#bucket[hashKey];
    if (curr.key === key) {
      this.#bucket[hashKey] = curr.next;
      this.#decreaseLength();
      return;
    }
    while (curr !== null) {
      if (curr.key === key) {
        curr = curr.next;
        break;
      }
      secondTolast = curr;
      curr = curr.next;
    }
    secondTolast.next = curr;
    console.log(this.#bucket);
    this.#decreaseLength();
  }

  #increaseLength() {
    this.length += 1;
  }
  #decreaseLength() {
    this.length -= 1;
  }

  length() {
    return this.length;
  }

  clear() {
    this.length = 0;
    this.#size = 16;
    this.#bucket = new Array(this.#size).fill(null);
  }

  keys() {
    let toString = "";
    this.#bucket.forEach((node) => {
      let curr = node;
      while (curr != null) {
        toString += curr.key + " ,";
        curr = curr.next;
      }
    });
    return toString;
  }
  values() {
    let toString = "";
    this.#bucket.forEach((node) => {
      let curr = node;
      while (curr != null) {
        toString += curr.data + " ,";
        curr = curr.next;
      }
    });
    return toString;
  }
  entries() {
    let toString = "[";
    this.#bucket.forEach((node) => {
      let curr = node;

      while (curr != null) {
        toString += `[${curr.data},${curr.key}]`;
        curr = curr.next;
      }
    });

    return toString + "]";
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test.keys());
