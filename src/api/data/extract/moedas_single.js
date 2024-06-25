const moedas_single = [
    {
        id: 'moedas-1',
        value: 1,
        type: 'Nota fiscal',
        date: '10/10/2024',
        name: 'Campanha 1',
        status: 'Moedas em análise',
        icon: 'await',
        steps: [
            {
                status: 'Pagamento confirmado',
                label: 'Identificamos seu pagamento',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Moedas em análise',
                label: 'Estamos analisando sua nota fiscal',
                date: '10/10/2024',
                icon: 'await',
                step: 2,
            },
        ],
        ong: {
            name: "Scratch",
            id: 5,
            img: "https://i.pinimg.com/564x/3b/07/47/3b0747f9e0801123c3598c94f50ecbcd.jpg"
        },
    },
    {
        id: 'moedas-2',
        value: 95,
        type: 'Doação',
        date: '10/10/2024',
        name: 'Campanha 2',
        status: 'Moedas confirmadas',
        icon: 'check',
        steps: [
            {
                status: 'Pagamento confirmado',
                label: 'Identificamos seu pagamento',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Moedas em análise',
                label: 'Estamos analisando sua nota fiscal',
                date: '10/10/2024',
                icon: 'check',
                step: 2,
            },
            {
                status: 'Moedas confirmadas',
                label: 'As moedas foram confirmadas',
                date: '10/10/2024',
                icon: 'check',
                step: 3,
            },
        ],
        ong: {
            name: "Scratch",
            id: 5,
            img: "https://i.pinimg.com/564x/3b/07/47/3b0747f9e0801123c3598c94f50ecbcd.jpg"
        },
    },
    {
        id: 'moedas-3',
        value: 1,
        type: 'Nota fiscal',
        date: '10/10/2024',
        name: 'Campanha 3',
        status: 'Moedas negadas',
        icon: 'uncheck',
        steps: [
            {
                status: 'Nota fiscal confirmada',
                label: 'Identificamos seu nota fiscal',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Nota fiscal inválida ',
                label: 'Sua nota fiscal é inválida',
                date: '10/10/2024',
                icon: 'uncheck',
                step: 2,
            },
        ],
        ong: {
            name: "Scratch",
            id: 5,
            img: "https://i.pinimg.com/564x/3b/07/47/3b0747f9e0801123c3598c94f50ecbcd.jpg"
        },
    },
    {
        id: 'moedas-4',
        value: 30,
        type: 'Doação',
        date: '10/10/2024',
        name: 'Campanha 4',
        status: 'Moedas expiradas',
        icon: 'dimiss',
        steps: [
            {
                status: 'Pagamento confirmado',
                label: 'Identificamos seu pagamento',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Moedas expiradas',
                label: 'As moedas expiraram',
                date: '10/10/2024',
                icon: 'dimiss',
                step: 2,
            },
        ],
        ong: {
            name: "Scratch",
            id: 5,
            img: "https://i.pinimg.com/564x/3b/07/47/3b0747f9e0801123c3598c94f50ecbcd.jpg"
        },
    },
];

export default moedas_single;
