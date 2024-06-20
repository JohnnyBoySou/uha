const rifas_single = [
    {
        id: 'rifa-1',
        value: 35,
        type: 'Rifa',
        date: '10/10/2024',
        name: 'Campanha AuAu',
        status: 'Rifa em análise',
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
                status: 'Rifa em análise',
                label: 'Estamos analisando sua rifa',
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
        id: 'rifa-2',
        value: 50,
        type: 'Rifa',
        date: '12/08/2024',
        name: 'Campanha docinho',
        status: 'Aguardando resultado',
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
                status: 'Rifa em análise',
                label: 'Estamos analisando sua rifa',
                date: '10/10/2024',
                icon: 'check',
                step: 2,
            },
            {
                status: 'Aguardando resultado',
                label: 'Estamos aguardando o resultado',
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
        id: 'rifa-3',
        value: 100,
        type: 'Rifa',
        date: '12/08/2024',
        name: 'Campanha Dindin',
        status: 'Pagamento negado',
        icon: 'uncheck',
        steps: [
            {
                status: 'Pagamento confirmado',
                label: 'Identificamos seu pagamento',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Rifa em análise',
                label: 'Estamos analisando sua rifa',
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
        id: 'rifa-4',
        value: 35,
        type: 'Rifa',
        date: '12/08/2024',
        name: 'Campanha Miaumiau',
        status: 'Pagamento expirado',
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
                status: 'Rifa em análise',
                label: 'Estamos analisando sua rifa',
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
]
export default rifas_single;