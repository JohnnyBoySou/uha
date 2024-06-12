const service_single = [
    {
        id: 1,
        name: "Banho e tosa",
        desc: "Breve descrição sobre o serviço que a loja vende",
        label: 'A partir de 40 pontos',
        categories: [
            {
                id: 12345,
                name: "Pets"
            },
            {
                id: 1234,
                name: "Cuidados"
            }
        ],
        old_value: 60,
        value: 40,
        imgs: ["https://i.pinimg.com/564x/6b/36/7f/6b367f53e5df858d867aa45ab0ea93ca.jpg", "https://i.pinimg.com/564x/7e/18/11/7e1811d00d6c4f1616db911528330785.jpg", "https://i.pinimg.com/564x/19/ca/2f/19ca2f7a75f497892cbe65d0d3859b53.jpg"],
        others: [
            {
                name: "Shampoo",
                id: 12345,
                img: "https://i.pinimg.com/564x/25/9e/27/259e27b073c57e14567030b7182df682.jpg",
                value: 15,
            },
            {
                name: "Bola canina",
                id: 123456,
                img: "https://i.pinimg.com/736x/72/47/e3/7247e37270e321777aa08a8cc7528b01.jpg",
                value: 20,
            },
            {
                name: "Shampoo",
                id: 123457,
                img: "https://i.pinimg.com/564x/25/9e/27/259e27b073c57e14567030b7182df682.jpg",
                value: 10,
            },
            {
                name: "Bola canina",
                id: 1234568,
                img: "https://i.pinimg.com/736x/72/47/e3/7247e37270e321777aa08a8cc7528b01.jpg",
                value: 12,
            },
        ],
        shop: {
            name: "Pet Shop",
            id: 12345,
            address: "Rua dos bobos, 0",
            cep: '88888-888',
            phone: "11999999999",
            open: "08:00",
            close: "18:00",
            whatsapp: '49 9 9999-9909',
            img: 'https://i.pinimg.com/564x/92/95/29/9295294bfb5559f1d736891ceeba4be5.jpg',
        }

},
]

 export default service_single;