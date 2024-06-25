const doacoes_single = [
    {
        id: 'doacoes-1',
        value: 35,
        type: 'Doação',
        date: '10/10/2024',
        name: 'Campanha 1',
        status: 'Pagamento em análise',
        icon: 'await',
        steps: [
            {
                status: 'Doação identificada',
                label: 'Identificamos sua doação',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pagamento em análise',
                label: 'Estamos analisando seu pagamento',
                date: '10/10/2024',
                icon: 'await',
                step: 2,
            },
        ],
        ong: {
            name: "ONG Exemplo",
            id: 1,
            img: "https://example.com/image1.jpg"
        },
    },
    {
        id: 'doacoes-2',
        value: 50,
        type: 'Doação',
        date: '12/08/2024',
        name: 'Campanha 2',
        status: 'Pagamento confirmado',
        icon: 'check',
        steps: [
            {
                status: 'Doação identificada',
                label: 'Identificamos sua doação',
                date: '12/08/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pagamento confirmado',
                label: 'Seu pagamento foi confirmado',
                date: '12/08/2024',
                icon: 'check',
                step: 2,
            },
        ],
        ong: {
            name: "ONG Exemplo",
            id: 1,
            img: "https://example.com/image1.jpg"
        },
    },
    {
        id: 'doacoes-3',
        value: 100,
        type: 'Doação',
        date: '05/05/2024',
        name: 'Campanha 3',
        status: 'Pagamento negado',
        icon: 'uncheck',
        steps: [
            {
                status: 'Doação identificada',
                label: 'Identificamos sua doação',
                date: '05/05/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pagamento negado',
                label: 'Seu pagamento foi negado',
                date: '05/05/2024',
                icon: 'uncheck',
                step: 2,
            },
        ],
        ong: {
            name: "ONG Exemplo",
            id: 1,
            img: "https://example.com/image1.jpg"
        },
    },
];

export default doacoes_single;
