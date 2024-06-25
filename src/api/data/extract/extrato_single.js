const extrato_single = [
    {
        id: 'extrato-1',
        value: 5,
        type: 'Nota fiscal',
        date: '10/10/2024',
        name: 'Transação 1',
        status: 'Moedas confirmadas',
        icon: 'check',
        steps: [
            {
                status: 'Nota fiscal recebida',
                label: 'Recebemos sua nota fiscal',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Moedas confirmadas',
                label: 'Suas moedas foram confirmadas',
                date: '10/10/2024',
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
        id: 'extrato-2',
        value: 100,
        type: 'Rifa',
        date: '10/10/2024',
        name: 'Transação 2',
        status: 'Transferência pronta para resgate',
        icon: 'check',
        steps: [
            {
                status: 'Rifa comprada',
                label: 'Sua rifa foi comprada',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Transferência pronta para resgate',
                label: 'Sua transferência está pronta para resgate',
                date: '10/10/2024',
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
        id: 'extrato-3',
        value: 10,
        type: 'Nota fiscal',
        date: '10/10/2024',
        name: 'Transação 3',
        status: 'Moedas em análise',
        icon: 'await',
        steps: [
            {
                status: 'Nota fiscal recebida',
                label: 'Recebemos sua nota fiscal',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Moedas em análise',
                label: 'Estamos analisando suas moedas',
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
        id: 'extrato-4',
        value: 50,
        type: 'Nota fiscal',
        date: '10/10/2024',
        name: 'Transação 4',
        status: 'Moedas negadas',
        icon: 'uncheck',
        steps: [
            {
                status: 'Nota fiscal recebida',
                label: 'Recebemos sua nota fiscal',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Moedas negadas',
                label: 'Suas moedas foram negadas',
                date: '10/10/2024',
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
    {
        id: 'extrato-5',
        value: 300,
        type: 'Pontos',
        date: '10/10/2024',
        name: 'Transação 5',
        status: 'Transferência bem sucedida',
        icon: 'check',
        steps: [
            {
                status: 'Pontos recebidos',
                label: 'Recebemos seus pontos',
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
            name: "ONG Exemplo",
            id: 1,
            img: "https://example.com/image1.jpg"
        },
    },
    {
        id: 'extrato-6',
        value: 10,
        type: 'Rifa',
        date: '10/10/2024',
        name: 'Transação 6',
        status: 'Pagamento confirmado',
        icon: 'check',
        steps: [
            {
                status: 'Rifa comprada',
                label: 'Sua rifa foi comprada',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Pagamento confirmado',
                label: 'Seu pagamento foi confirmado',
                date: '10/10/2024',
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
        id: 'extrato-7',
        value: 5,
        type: 'Nota fiscal',
        date: '10/10/2024',
        name: 'Transação 7',
        status: 'Moedas expiradas',
        icon: 'dimiss',
        steps: [
            {
                status: 'Nota fiscal recebida',
                label: 'Recebemos sua nota fiscal',
                date: '10/10/2024',
                icon: 'check',
                step: 1,
            },
            {
                status: 'Moedas expiradas',
                label: 'Suas moedas expiraram',
                date: '10/10/2024',
                icon: 'dimiss',
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

export default extrato_single;
