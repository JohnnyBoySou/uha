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
        imgs: ["https://i.pinimg.com/564x/8b/02/f5/8b02f58cc7ed6b3b2c109df908362800.jpg", "https://i.pinimg.com/564x/7e/18/11/7e1811d00d6c4f1616db911528330785.jpg", "https://i.pinimg.com/564x/19/ca/2f/19ca2f7a75f497892cbe65d0d3859b53.jpg"],
        others: [
            {
                name: "Corte de cabelo",
                id: 12345,
                img: "https://i.pinimg.com/564x/79/0d/99/790d99b47c5f8f45c6321d6768bd2d4b.jpg",
                value: 15,
            },
            {
                name: "Exames de rotina",
                id: 123456,
                img: "https://i.pinimg.com/564x/8c/bd/52/8cbd52096f4d6835f454f142e4842988.jpg",
                value: 50,
            },
        ],
        shop: {
            name: "Pet",
            id: 12345,
            desc: 'Aqui você encontra tudo para seu pet',
            address: "Rua Josival Lourenço, N. 12 - Centro - PR",
            cep: '89260665',
            phone: "11999999999",
            open: "08:00",
            close: "18:00",
            whatsapp: '49 9 9999-9909',
            capa: 'https://i.pinimg.com/564x/fe/ab/87/feab8707dcd5270fee4eed7263b0a8af.jpg',
            img: 'https://i.pinimg.com/564x/08/f6/3d/08f63d42e41667f518127da812cfe654.jpg',
        }

    },
    {
        id: 2,
        name: "Corte de cabelo",
        desc: "Breve descrição sobre o serviço que a loja vende",
        label: 'A partir de 15 pontos',
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
        value: 15,
        imgs: ["https://i.pinimg.com/564x/79/0d/99/790d99b47c5f8f45c6321d6768bd2d4b.jpg", "https://i.pinimg.com/564x/7e/18/11/7e1811d00d6c4f1616db911528330785.jpg", "https://i.pinimg.com/564x/19/ca/2f/19ca2f7a75f497892cbe65d0d3859b53.jpg"],
        others: [
            {
                name: "Corte de cabelo",
                id: 12345,
                img: "https://i.pinimg.com/564x/79/0d/99/790d99b47c5f8f45c6321d6768bd2d4b.jpg",
                value: 15,
            },
            {
                name: "Exames de rotina",
                id: 123456,
                img: "https://i.pinimg.com/564x/8c/bd/52/8cbd52096f4d6835f454f142e4842988.jpg",
                value: 50,
            },
        ],
        shop: {
            name: "Pet",
            id: 12345,
            desc: 'Aqui você encontra tudo para seu pet',
            address: "Rua Josival Lourenço, N. 12 - Centro - PR",
            cep: '89260665',
            phone: "11999999999",
            open: "08:00",
            close: "18:00",
            whatsapp: '49 9 9999-9909',
            capa: 'https://i.pinimg.com/564x/fe/ab/87/feab8707dcd5270fee4eed7263b0a8af.jpg',
            img: 'https://i.pinimg.com/564x/08/f6/3d/08f63d42e41667f518127da812cfe654.jpg',
        }

    },
]

 export default service_single;