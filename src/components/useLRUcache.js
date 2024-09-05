import { useRef} from "react";

class LRUcache{
    constructor(capacity){
        this.capacity = capacity;
        this.cache = {};
        this.head = null;
        this.tail = null;
    }

    get(key){
        if(this.cache[key]){
            this.moveToFront(key);
            return this.cache[key];
        }
        
        return null;
    }

    put(key, val){

        if(this.cache[key]){
            this.cache[key] = val;
            // move to front
            this.moveToFront(key, val);
        }
        else{// if not
        // shift other to right 
            if(this.cache.length === this.capacity){
                // this.removelast
                this.removeLast();
            }

            this.addToFront(key, val);
          // add to front
        }

    }

    addToFront(key, val){
        const newNode = {key, val, next: null}
        
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            newNode.next = this.head;
            this.head = newNode;
        }

        this.cache[key] = newNode;

    }


    moveToFront(key){
        const current = this.cache[key];

        if(current === this.head){
            return;
        }

        let prev = null;
        let node = this.head;

        while(node && node.key !== key){
            prev = node;
            node = node.next;
        }

        if(!node)   return;
        if(node === this.tail){
            this.tail = prev;
        }

        if(prev){
            prev.next = node.next;
        }

        node.next = this.head;
        this.head = node;
    }


    removeLast(){
        if(!this.head)  return;

        const lastKey = this.tail.key;
        delete this.cache[lastKey];

        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
        }
        else{
            let current = this.head;
            while(current.next !== this.tail){
                current = current.next;
            }

            current.next = null;
            this.tail = current;
        }
    }

    

    
}

const useLRUcache = (capacity) => {
    const cacheRef = useRef(new LRUcache(capacity));

    return{
        get: (key) => cacheRef.current.get(key),
        put: (key, val) => cacheRef.current.put(key, val)
    }
}

export default useLRUcache;