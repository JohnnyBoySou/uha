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
]
export default rifas_single;