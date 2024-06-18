const ongs = [
    {
        id: 1,
        name: 'Patinhas do Bem',
        desc: 'Pets | Resgates | Adoções',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.',
        img: 'https://i.pinimg.com/564x/79/1b/3a/791b3a33b2ce3320ca1817310ad9ae58.jpg',
    },
    {
        id: 2,
        name: 'Cantinho do Tompero',
        desc: 'Pets | Reabilitação | Cuidados Especiais',
        img: 'https://i.pinimg.com/564x/18/85/21/18852105e109c6020d4089b37cc8403e.jpg',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.'

    },
    {
        id: 3,
        name: 'Meu Melhor Amigo 4 Patas',
        desc: 'Adoção | Tratamento | Castração',
        img: 'https://i.pinimg.com/564x/7e/3f/4c/7e3f4c60496ce171c102fd2bea7013ce.jpg',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.'
    },
    {
        id: 4,
        name: 'Anima',
        desc: 'Adoção | Vacinação',
        img: 'https://i.pinimg.com/564x/b2/88/c9/b288c9c134ab0f2331978a813d64bd50.jpg',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.',
        imgs: ['https://i.pinimg.com/236x/ca/bd/de/cabdde4815b39431bc9034e7602f08e4.jpg', 'https://i.pinimg.com/236x/92/20/9e/92209e6237ede3ffe71630b92f60a5b1.jpg','https://i.pinimg.com/236x/ba/ba/a9/babaa93c043b5d93a9f042c8efc8127e.jpg', ]
    },
    {
        id: 5,
        name: 'Scratch',
        desc: 'Adoção | Vacinação',
        img: 'https://i.pinimg.com/564x/3b/07/47/3b0747f9e0801123c3598c94f50ecbcd.jpg',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.',
        imgs: ['https://i.pinimg.com/236x/27/a4/d6/27a4d6a4e1dbef1a7486804adffca410.jpg','https://i.pinimg.com/236x/95/f7/67/95f767de9e696397e2f3ee5db0b5524f.jpg','https://i.pinimg.com/236x/3c/ca/9d/3cca9de4378a97e6ed5ac743362867fc.jpg']
    },
    {
        id: 6,
        name: 'Petfolk',
        desc: 'Adoção | Vacinação',
        img: 'https://i.pinimg.com/564x/1a/39/85/1a39851f24b4e6aff7575ba5e01ee044.jpg',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.',
        imgs: ['https://i.pinimg.com/564x/3f/10/1f/3f101faffbd94bfb5e7df10058d8ce6c.jpg','https://i.pinimg.com/236x/b8/72/cb/b872cbcc10a6789318a03c1fe1e5b62a.jpg','https://i.pinimg.com/236x/51/e7/2e/51e72ea0368ece0324cc6affd93c2c60.jpg']
    },
    {
        id: 7,
        name: 'MLEM',
        desc: 'Adoção | Vacinação',
        img: 'https://i.pinimg.com/564x/24/9d/d4/249dd4bc9fc6e67d3b3a8fc1fbd973df.jpg',
        about: 'Fundado em fevereiro de 2015, a partir da união de um grupo de pessoas em prol do propósito de cuidar bem e adotar bem cada animal, o Instituto Caramelo atua principalmente no resgate de animais feridos ou em situação de risco, recuperação e adoção. Mantemos um abrigo com cerca de 300 animais, entre cães e gatos, todos resgatados das ruas, onde eles são protegidos, tratados, alimentados e aguardam pela chance de serem adotados.',
        imgs: ['https://i.pinimg.com/236x/39/0d/3d/390d3dabf87a5c3e8aa1b394c6d4289c.jpg','https://i.pinimg.com/236x/4b/dd/c9/4bddc98d2fe9a699cd9aa134aa3d7994.jpg', 'https://i.pinimg.com/236x/f2/85/52/f28552352c58b62cde278a0b0ea1f17e.jpg']
    },
]
export default ongs;