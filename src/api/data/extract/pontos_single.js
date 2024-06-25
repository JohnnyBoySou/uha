const pontos_single = [
    {
        id: 'pontos-1',
        value: 1,
        type: 'Nota fiscal',
        date: '10/10/2024',
        name: 'Campanha 1',
        status: 'Pontos em análise',
        icon: 'await',
        steps: [
            {
                status: 'Pagamento confirmado',
                label: 'Identificamos sua nota fiscal',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pontos em análise',
                label: 'Estamos analisando seus pontos',
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
        id: 'pontos-2',
        value: 1,
        type: 'Nota fiscal',
        date: '10/10/2024',
        name: 'Campanha 2',
        status: 'Pontos confirmado',
        icon: 'check',
        steps: [
            {
                status: 'Pagamento confirmado',
                label: 'Identificamos sua nota fiscal',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pontos confirmado',
                label: 'Seus pontos foram confirmados',
                date: '10/10/2024',
                icon: 'check',
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
        id: 'pontos-3',
        value: 1,
        type: 'Nota fiscal',
        date: '10/10/2024',
        name: 'Campanha 3',
        status: 'Pontos negado',
        icon: 'uncheck',
        steps: [
            {
                status: 'Pagamento confirmado',
                label: 'Identificamos sua nota fiscal',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pontos negado',
                label: 'Seus pontos foram negados',
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
        id: 'pontos-4',
        value: 30,
        type: 'Doação',
        date: '10/10/2024',
        name: 'Campanha 4',
        status: 'Pontos confirmado',
        icon: 'check',
        steps: [
            {
                status: 'Doação identificada',
                label: 'Identificamos sua doação',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pontos confirmado',
                label: 'Seus pontos foram confirmados',
                date: '10/10/2024',
                icon: 'check',
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
        id: 'pontos-5',
        value: 300,
        type: 'Doação',
        date: '10/10/2024',
        name: 'Campanha 5',
        status: 'Transferência bem sucedida',
        icon: 'check',
        steps: [
            {
                status: 'Doação identificada',
                label: 'Identificamos sua doação',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Transferência bem sucedida',
                label: 'Sua transferência foi bem sucedida',
                date: '10/10/2024',
                icon: 'check',
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
        id: 'pontos-6',
        value: -300,
        type: 'Pontos',
        date: '10/10/2024',
        name: 'Campanha 6',
        status: 'Pontos confirmado',
        icon: 'check',
        steps: [
            {
                status: 'Pontos identificados',
                label: 'Identificamos seus pontos',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pontos confirmados',
                label: 'Seus pontos foram confirmados',
                date: '10/10/2024',
                icon: 'check',
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
        id: 'pontos-7',
        value: 300,
        type: 'Doação',
        date: '10/10/2024',
        name: 'Campanha 7',
        status: 'Transferência bem sucedida',
        icon: 'check',
        steps: [
            {
                status: 'Doação identificada',
                label: 'Identificamos sua doação',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Transferência bem sucedida',
                label: 'Sua transferência foi bem sucedida',
                date: '10/10/2024',
                icon: 'check',
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
        id: 'pontos-8',
        value: 45,
        type: 'Doação',
        date: '10/10/2024',
        name: 'Campanha 8',
        status: 'Pontos expirado',
        icon: 'dimiss',
        steps: [
            {
                status: 'Doação identificada',
                label: 'Identificamos sua doação',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pontos expirado',
                label: 'Seus pontos expiraram',
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

export default pontos_single;