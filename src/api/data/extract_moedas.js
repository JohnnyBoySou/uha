const extract_moedas = 
[
    {
        "id":"9876543234567898765434567899876543",
        "value": 1,
        "type": "Nota fiscal",
        "date": "10/10/2024",
        "status": "Moedas resgatadas",
        "icon": "check",
        "ong": {
            "name": "Instituto Caramelo",
            "id": "inst-carameloid"
        },
        "road": [{
            "step": 1,
            "date": "08/10/2024",
            "status": "Nota fiscal enviada",
            "label": "Aguardando análise",
            "icon": "check"
        },
        {
            "step": 2, 
            "date": "09/10/2024",
            "status": "Moedas identificado",
            "label": "Nota fiscal válida",
            "icon": "check"
        },
        {
            "step": 3,
            "date": "09/10/2024",
            "status": "Moedas resgatadas",
            "label": "Você recebeu seus pontos",
            "icon": "check"
        },
        ]
    },
    {
        "id":"3",
        "value": 95,
        "type": "Doacao",
        "date": "10/10/2024",
        "status": "Doação confirmada",
        "icon": "check",
        "ong": {
            "name": "Instituto Caramelo",
            "id": "inst-carameloid"
        },
        "road": [{
            "step": 1,
            "date": "08/10/2024",
            "status": "Doação enviada",
            "label": "Aguardando análise",
            "icon": "check"
        },
        {
            "step": 2, 
            "date": "09/10/2024",
            "status": "Campanha identificada",
            "label": "Pagamento aprovado",
            "icon": "check"
        },
        {
            "step": 3,
            "date": "09/10/2024",
            "status": "Doação confirmada",
            "label": "Você recebeu suas pontos",
            "icon": "check"
        },
        ]
    },
    {
        "id":"4",
        "value": 1,
        "type": "Nota fiscal",
        "date": "10/10/2024",
        "status": "Nota fiscal enviada",
        "icon": "await",
        "ong": {
            "name": "Instituto Caramelo",
            "id": "inst-carameloid"
        },
        "road": [{
            "step": 1,
            "date": "08/10/2024",
            "status": "Nota fiscal enviada",
            "label": "Aguardando análise",
            "icon": "check"
        },
        ]
    },
    {
        "id":"5",
        "value": 10,
        "type": "Nota fiscal",
        "date": "10/10/2024",
        "status": "Nota fiscal invalida",
        "icon": "uncheck",
        "ong": {
            "name": "Instituto Caramelo",
            "id": "inst-carameloid"
        },
        "road": [{
            "step": 1,
            "date": "08/10/2024",
            "status": "Nota fiscal enviada",
            "label": "Aguardando análise",
            "icon": "check"
        },
        {
            "step": 2, 
            "date": "09/10/2024",
            "status": "Moedas identificadas",
            "label": "Nota fiscal inválida",
            "icon": "uncheck"
        },
        {
            "step": 3,
            "date": "09/10/2024",
            "status": "Moedas não confirmadas",
            "label": "O resgate não pode ser valido pois não cumpre aos termos.",
            "icon": "uncheck"
        },
        ]
    },
]
    export default extract_moedas;
//url: base_url + "api/extract/moedas?id=1",
//token no body
//method: "GET",
//headers: { "Content-Type": "application/json }