const registros_chat = 
[
    {
        "id":"987654",
        "value": 1,
        "type": "Dúvida",
        "date": "10/10/2024",
        "status": "Solucionada",
        "icon": "check",
        "message": "Olá, gostaria de saber como faço para me inscrever no curso de inglês?",
        "road": [{
            "step": 1,
            "date": "08/10/2024",
            "status": "Registro de dúvida",
            "label": "Aguardando prazo de resposta",
            "icon": "check"
        },
        {
            "step": 2, 
            "date": "09/10/2024",
            "status": "Análise de registro",
            "label": "Nosso time está trabalhando",
            "icon": "check"
        },
        {
            "step": 3,
            "date": "09/10/2024",
            "status": "Dúvida solucionada",
            "label": "Você finalizou o atendimento",
            "icon": "check"
        },
        ]
    },
    
]

export default registros_chat;

//url: base_url + "api/extract/moedas?id=1",
//token no body
//method: "GET",
//headers: { "Content-Type": "application/json }