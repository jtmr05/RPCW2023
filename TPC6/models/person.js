const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema(
    {
        acorda_cedo : Boolean,
        comida_favorita : String,
        fumador : Boolean,
        gosta_animais_estimacao : Boolean,
        gosta_cinema : Boolean,
        gosta_comer : Boolean,
        gosta_dancar : Boolean,
        gosta_ler : Boolean,
        gosta_musica : Boolean,
        gosta_viajar : Boolean
    }
);

const politicalPartySchema = new mongoose.Schema(
    {
        party_abbr : String,
        party_name : String
    }
);

const residenceSchema = new mongoose.Schema(
    {
        cidade   : String,
        distrito : String
    }
);

const personSchema = new mongoose.Schema(
    {
        _id : String,
        BI : String,
        animais : [String],
        atributos : attributeSchema,
        desportos : [String],
        destinos_favoritos : [String],
        figura_publica_pt : [String],
        idade : Number,
        nome : String,
        marca_carro : String,
        morada : residenceSchema,
        partido_politico : politicalPartySchema,
        profissao : String,
        religiao : String,
        sexo : String
    }
);

module.exports = mongoose.model('person', personSchema);
