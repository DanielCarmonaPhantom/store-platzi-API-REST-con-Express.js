const faker = require('faker')

class ProductsService{

    constructor(){
        this.products = [];
        this.generate();
    }

    generate(){
        const limit = 100;

        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(),10),
                image: faker.image.imageUrl()
            });
        }
    }

    create(data){
        const { name, price, image } = data;
        const newProduct = {
            id: faker.datatype.uuid(),
            name,
            price,
            image
        };

        this.products.push(newProduct);
        return newProduct;
    }

    find(){
        return this.products;
    }

    findOne(id){
        return this.products.find(item => item.id === id);
    }

    update(id, changes){
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('product not found')
        }else{
            this.products[index] = changes;
            return this.products[index];
        }        
    }

    delete(id){
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('product not found')
        }else{
            this.products.splice(index,1);
            return {
                message: true,
                id
            }
        }    
    }

}

module.exports = ProductsService;