const fs = require('fs');

// const wordz = {
//     "directions":{
//         "anpa": {
//            "definitions": ["bottom side", "downward"],
//            images: ['anpa1.png'],
//         },
//        "insa": {
//            "definitions": ["inside (place)", "inside-ward"],
//            images: ['insa1.png'],
//         },
//        "jupa": {
//            "definitions": ["right side", "rightward"],
//            images: ['jupa1.png'],
//         },
//        "kona": {
//            "definitions": ["corner", "corner-ward"],
//            images: ['kona1.png'],
//         },
//        "matija": {
//            "definitions": ["middle", "middle-ward"],
//            images: ['matija1.png'],
//         },
//        "monsi": {
//            "definitions": ["back side", "backward"],
//            images: ['monsi1.png'],
//         },
//        "nesi": {
//            "definitions": ["outside (place)", "outside-ward"],
//            images: ['nesi1.png', 'nesi2.png'],
//         },
//        "poka": {
//            "definitions": ["nearby"],
//            images: ['poka1.jpg'],
//         },
//        "sinpin": {
//            "definitions": ["front side", "frontward"],
//            images: ['sinpin1.png'],
//         },
//        "soto": {
//            "definitions": ["left side", "leftward"],
//            images: ['soto1.png'],
//         },
//        "wi": {
//            "definitions": ["top side", "upward"],
//            images: ['wi1.png'],
//         },
//     },
//     "animals":{
//         "aketi": {
//            "definitions": ["reptile"],
//            images: [],
//         },
//        "janwa": {
//            "definitions": ["animal"],
//            images: [],
//         },
//        "kala": {
//            "definitions": ["fish"],
//            images: [],
//         },
//        "keke": {
//            "definitions": ["primate"],
//            images: [],
//         },
//        "kita": {
//            "definitions": ["ungulate", "hooved animal"],
//            images: ['kita1.jpg'],
//         },
//        "meja": {
//            "definitions": ["feliformia", "feline animal", "cat"],
//            images: [],
//         },
//        "misa": {
//            "definitions": ["rodent"],
//            images: [],
//         },
//        "mu": {
//            "definitions": ["bovidae", "cow", "bovine animal"],
//            images: ['mu1.jpeg'],
//         },
//        "neje": {
//            "definitions": ["equidae", "horse", "equine animal"],
//            images: ['neje1.jpg'],
//         },
//        "pawo": {
//            "definitions": ["caniformia", "dog", "canine animal"],
//            images: ['pawo1.jpg', 'pawo2.jpg'],
//         },
//        "pipi": {
//            "definitions": ["insect", "pest", "annoyance"],
//            images: [],
//         },
//        "soweli": {
//            "definitions": ["mammal"],
//            images: [],
//         },
//        "waso": {
//            "definitions": ["bird"],
//            images: [],
//         },
//     },
//     "miscNouns":{
//        "mi": {
//            "definitions": ["me"],
//            images: [],
//         },
//        "si": {
//            "definitions": ["you"],
//            images: [],
//         },
//        "on": {
//            "definitions": ["he", "she", "they", "it"],
//            images: [],
//         },
//        "mama": {
//            "definitions": ["parent"],
//            images: [],
//         },
//        "putala": {
//            "definitions": ["child"],
//            images: [],
//         },
//        "walala": {
//            "definitions": ["sibling"],
//            images: [],
//         },
//        "esun": {
//            "definitions": ["market", "store", "shop", "buy", "exchange", "trade"],
//            images: [],
//         },
//        "mani": {
//            "definitions": ["money", "monetary"],
//            images: [],
//         },
//        "inpali": {
//            "definitions": ["flower"],
//            images: [],
//         },
//        "kaje": {
//            "definitions": ["tree", "wood", "wooden"],
//            images: [],
//         },
//        "kasi": {
//            "definitions": ["plant", "plant-like"],
//            images: [],
//         },
//        "soko": {
//            "definitions": ["fungus", "mushroom", "fungal"],
//            images: [],
//         },
//        "into": {
//            "definitions": ["place", "area", "outdoor area"],
//            images: [],
//         },
//        "tomo": {
//            "definitions": ["house", "building", "room", "enclosed structure", "indoor area"],
//            images: [],
//         },
//        "ma": {
//            "definitions": ["land", "earth", "region", "earthen"],
//            images: [],
//         },
//        "kiwen": {
//            "definitions": ["stone", "rock", "rocky"],
//            images: [],
//         },
//        "ko": {
//            "definitions": ["paste", "goo", "gooey"],
//            images: [],
//         },
//        "kon": {
//            "definitions": ["air", "wind", "airy", "windy"],
//            images: [],
//         },
//        "moto": {
//            "definitions": ["fire", "fiery", "plasma"],
//            images: [],
//         },
//        "telo": {
//            "definitions": ["water", "liquid", "watery", "wet"],
//            images: [],
//         },
//        "jala": {
//            "definitions": ["condition", "state of being"],
//            images: [],
//         },
//        "naka": {
//            "definitions": ["city", "society", "developed land", "industrialized", "man-made?"],
//            images: [],
//         },
//        "jesen": {
//            "definitions": ["nature", "natural", "wild"],
//            images: [],
//         },
//        "jan": {
//            "definitions": ["human", "person"],
//            images: [],
//         },
//        "jun": {
//            "definitions": ["hair"],
//            images: [],
//         },
//        "linja": {
//            "definitions": ["line", "linear", "long", "stretched out lengthwise", "lined up", "to line up", "to strech out"],
//            images: [],
//         },
//        "kalite": {
//            "definitions": ["quality", "aspect", "abstract facet"],
//            images: [],
//         },
//        "kanputa": {
//            "definitions": ["computer"],
//            images: [],
//         },
//        "kanun": {
//            "definitions": ["law", "standard", "standardize", "legalize", "rule"],
//            images: [],
//         },
//        "kili": {
//            "definitions": ["fruit", "vegetable"],
//            images: [],
//         },
//        "pan": {
//            "definitions": ["bread", "grain"],
//            images: [],
//         },
//        "kule": {
//            "definitions": ["color"],
//            images: [],
//         },
//        "kumi": {
//            "definitions": ["rubber", "plastic", "stretchy?", "pliable?"],
//            images: [],
//         },
//        "oliwa": {
//            "definitions": ["oil", "oily"],
//            images: [],
//         },
//        "tiwata": {
//            "definitions": ["glass", "glassy"],
//            images: [],
//         },
//        "leko": {
//            "definitions": ["solid block", "supporting/dividing structure", "obstruction/barrier?"],
//            images: [],
//         },
//        "tapa": {
//            "definitions": ["container", "box", "bowl", "cup", "bag", "purse", "to package", "to fill (a container)"],
//            images: [],
//         },
//        "kulupu": {
//            "definitions": ["group", "collection", "group together", "gather", "collect"],
//            images: [],
//         },
//        "kuwan": {
//            "definitions": ["light (visual)", "bright"],
//            images: [],
//         },
//        "lipu": {
//            "definitions": ["flat object", "document", "book", "canvas", "newspaper", "written material"],
//            images: [],
//         },
//        "supa": {
//            "definitions": ["table", "bed", "horizontal surface"],
//            images: [],
//         },
//        "tiwa": {
//            "definitions": ["wall", "vertical surface"],
//            images: [],
//         },
//        "lupa": {
//            "definitions": ["hole", "door", "opening", "gap", "open", "make a hole", "puncture"],
//            images: [],
//         },
//        "misali": {
//            "definitions": ["example", "version"],
//            images: [],
//         },
//        "mun": {
//            "definitions": ["moon", "month"],
//            images: [],
//         },
//        "wetu": {
//            "definitions": ["star", "year"],
//            images: [],
//         },
//        "suno": {
//            "definitions": ["sun", "day"],
//            images: [],
//         },
//        "aka": {
//            "definitions": ["sky"],
//            images: [],
//         },
//        "nanpa": {
//            "definitions": ["number"],
//            images: [],
//         },
//        "nasin": {
//            "definitions": ["path", "direction"],
//            images: [],
//         },
//        "nata": {
//            "definitions": ["relationship"],
//            images: [],
//         },
//        "nimi": {
//            "definitions": ["name", "word"],
//            images: [],
//         },
//        "osa": {
//            "definitions": ["part", "section", "hour"],
//            images: [],
//         },
//        "palisa": {
//            "definitions": ["stick"],
//            images: [],
//         },
//        "peman": {
//            "definitions": ["deal", "agreement", "contract", "pact"],
//            images: [],
//         },
//        "penke": {
//            "definitions": ["event", "instance", "moment", "second"],
//            images: [],
//         },
//        "popoto": {
//            "definitions": ["mountain", "bump"],
//            images: [],
//         },
//        "pume": {
//            "definitions": ["smoke", "cloud"],
//            images: [],
//         },
//        "sa": {
//            "definitions": ["thing"],
//            images: [],
//         },
//        "sala": {
//            "definitions": ["atom", "smallest possible object"],
//            images: [],
//         },
//        "sewi": {
//            "definitions": ["religion"],
//            images: [],
//         },
//        "sike": {
//            "definitions": ["circle"],
//            images: [],
//         },
//        "taka": {
//            "definitions": ["wave", "repetition", "ripple"],
//            images: [],
//         },
//        "talika": {
//            "definitions": ["table", "list"],
//            images: [],
//         },
//        "tenpo": {
//            "definitions": ["time", "duration", "minute"],
//            images: [],
//         },
//        "tisi": {
//            "definitions": ["system", "method"],
//            images: [],
//         },
//        "tolu": {
//            "definitions": ["cup", "tube"],
//            images: [],
//         },
//        "woka": {
//            "definitions": ["powder"],
//            images: [],
//         },
//        "ni": {
//            "definitions": ["this"],
//            images: [],
//         },
//        "na": {
//            "definitions": ["that"],
//            images: [],
//         }
//     },
//     "miscVerbs":{
//        "alasa": {
//            "definitions": ["look for", "hunt", "find"],
//            images: [],
//         },
//        "ato": {
//            "definitions": ["drive"],
//            images: [],
//         },
//        "ilo": {
//            "definitions": ["use"],
//            images: [],
//         },
//        "iman": {
//            "definitions": ["trust", "believe"],
//            images: [],
//         },
//        "inkatan": {
//            "definitions": ["remember"],
//            images: [],
//         },
//        "jo": {
//            "definitions": ["have", "possess", "own"],
//            images: [],
//         },
//        "kake": {
//            "definitions": ["result in"],
//            images: [],
//         },
//        "kalama": {
//            "definitions": ["produce sound"],
//            images: [],
//         },
//        "kama": {
//            "definitions": ["become"],
//            images: [],
//         },
//        "kanti": {
//            "definitions": ["sing", "play (instrument)"],
//            images: [],
//         },
//        "kela": {
//            "definitions": ["play (game)"],
//            images: [],
//         },
//        "ken": {
//            "definitions": ["be able to"],
//            images: [],
//         },
//        "kipisi": {
//            "definitions": ["cut", "divide"],
//            images: [],
//         },
//        "kisa": {
//            "definitions": ["narrate"],
//            images: [],
//         },
//        "kokan": {
//            "definitions": ["try"],
//            images: [],
//         },
//        "konta": {
//            "definitions": ["understand", "learn"],
//            images: [],
//         },
//        "lajo": {
//            "definitions": ["broadcast", "announce"],
//            images: [],
//         },
//        "lanpan": {
//            "definitions": ["take", "receive"],
//            images: [],
//         },
//        "len": {
//            "definitions": ["wear", "be covered with"],
//            images: [],
//         },
//        "lika": {
//            "definitions": ["write", "compose"],
//            images: [],
//         },
//        "lukin": {
//            "definitions": ["see"],
//            images: [],
//         },
//        "moku": {
//            "definitions": ["eat", "consume"],
//            images: [],
//         },
//        "nena": {
//            "definitions": ["smell"],
//            images: [],
//         },
//        "oke": {
//            "definitions": ["accept"],
//            images: [],
//         },
//        "pali": {
//            "definitions": ["make", "do"],
//            images: [],
//         },
//        "pana": {
//            "definitions": ["give"],
//            images: [],
//         },
//        "papon": {
//            "definitions": ["emit", "excrete"],
//            images: [],
//         },
//        "pati": {
//            "definitions": ["celebrate"],
//            images: [],
//         },
//        "pesoni": {
//            "definitions": ["need"],
//            images: [],
//         },
//        "pilin": {
//            "definitions": ["feel"],
//            images: [],
//         },
//        "saku": {
//            "definitions": ["choose"],
//            images: [],
//         },
//        "sankan": {
//            "definitions": ["signify", "mean"],
//            images: [],
//         },
//        "sawapu": {
//            "definitions": ["answer", "respond"],
//            images: [],
//         },
//        "solu": {
//            "definitions": ["ask"],
//            images: [],
//         },
//        "sitelen": {
//            "definitions": ["draw", "illustrate", "graphically represent"],
//            images: [],
//         },
//        "siten": {
//            "definitions": ["sit"],
//            images: [],
//         },
//        "sona": {
//            "definitions": ["know"],
//            images: [],
//         },
//        "tana": {
//            "definitions": ["think"],
//            images: [],
//         },
//        "tinto": {
//            "definitions": ["listen", "hear"],
//            images: [],
//         },
//        "toki": {
//            "definitions": ["say", "communicate"],
//            images: [],
//         },
//        "ukumu": {
//            "definitions": ["order", "demand", "mandate"],
//            images: [],
//         },
//        "wile": {
//            "definitions": ["want"],
//            images: [],
//         },
//        "wolin": {
//            "definitions": ["love"],
//            images: [],
//         }
//     },
//     "colors":{
//         "jelo": {
//            "definitions": ["yellow"],
//            images: [],
//         },
//        "kapesi": {
//            "definitions": ["brown", "gray"],
//            images: [],
//         },
//        "laso": {
//            "definitions": ["blue"],
//            images: [],
//         },
//        "loje": {
//            "definitions": ["red"],
//            images: [],
//         },
//        "peta": {
//            "definitions": ["green"],
//            images: [],
//         },
//        "pimeja": {
//            "definitions": ["black"],
//            images: [],
//         },
//        "walo": {
//            "definitions": ["white"],
//            images: [],
//         },
//     },
//     "feelings":{
//         "apeja": {
//            "definitions": ["ashamed"],
//            images: [],
//         },
//        "atali": {
//            "definitions": ["respectful"],
//            images: [],
//         },
//        "enujo": {
//            "definitions": ["bored"],
//            images: [],
//         },
//        "kanja": {
//            "definitions": ["intoxicated"],
//            images: [],
//         },
//        "kuton": {
//            "definitions": ["hurt", "in pain"],
//            images: [],
//         },
//        "lakima": {
//            "definitions": ["sad"],
//            images: [],
//         },
//        "liso": {
//            "definitions": ["laughing"],
//            images: [],
//         },
//        "monsuta": {
//            "definitions": ["scared"],
//            images: [],
//         },
//        "pasan": {
//            "definitions": ["happy"],
//            images: [],
//         },
//        "santi": {
//            "definitions": ["calm"],
//            images: [],
//         },
//        "tajan": {
//            "definitions": ["angry"],
//            images: [],
//         },
//        "tijan": {
//            "definitions": ["focused"],
//            images: [],
//         },
//        "tutu": {
//            "definitions": ["excited"],
//            images: [],
//         },
//        "walaja": {
//            "definitions": ["surprised"],
//            images: [],
//         },
//     },
//     "miscModifiers":{
//        "kikolo": {
//            "definitions": ["bitter"],
//            images: [],
//         },
//        "masala": {
//            "definitions": ["spicy"],
//            images: [],
//         },
//        "num": {
//            "definitions": ["salty"],
//            images: [],
//         },
//        "suwi": {
//            "definitions": ["sweet"],
//            images: [],
//         },
//        "umami": {
//            "definitions": ["umami", "savory"],
//            images: [],
//         },
//        "wawasa": {
//            "definitions": ["sour"],
//            images: [],
//         },
//        "meli": {
//            "definitions": ["female"],
//            images: [],
//         },
//        "mije": {
//            "definitions": ["male"],
//            images: [],
//         },
//        "tonsi": {
//            "definitions": ["non binary"],
//            images: [],
//         },
//        "aja": {
//            "definitions": ["alive"],
//            images: [],
//         },
//        "moli": {
//            "definitions": ["dead"],
//            images: [],
//         },
//        "ajuta": {
//            "definitions": ["helpful"],
//            images: [],
//         },
//        "akile": {
//            "definitions": ["next", "future"],
//            images: [],
//         },
//        "pisile": {
//            "definitions": ["previous", "past"],
//            images: [],
//         },
//        "iputu": {
//            "definitions": ["current", "present"],
//            images: [],
//         },
//        "ali": {
//            "definitions": ["all"],
//            images: [],
//         },
//        "ante": {
//            "definitions": ["changed"],
//            images: [],
//         },
//        "sama": {
//            "definitions": ["same"],
//            images: [],
//         },
//        "awen": {
//            "definitions": ["stationary"],
//            images: [],
//         },
//        "tawa": {
//            "definitions": ["moving"],
//            images: [],
//         },
//        "epi": {
//            "definitions": ["heavy", "fat"],
//            images: [],
//         },
//        "mawon": {
//            "definitions": ["light", "thin"],
//            images: [],
//         },
//        "ike": {
//            "definitions": ["bad"],
//            images: [],
//         },
//        "pona": {
//            "definitions": ["good"],
//            images: [],
//         },
//        "intisa": {
//            "definitions": ["patient", "waiting"],
//            images: [],
//         },
//        "isala": {
//            "definitions": ["wrong"],
//            images: [],
//         },
//        "tuntan": {
//            "definitions": ["correct"],
//            images: [],
//         },
//        "jaki": {
//            "definitions": ["dirty", "disgusting", "yucky"],
//            images: [],
//         },
//        "sapi": {
//            "definitions": ["clean"],
//            images: [],
//         },
//        "jatila": {
//            "definitions": ["difficult"],
//            images: [],
//         },
//        "patila": {
//            "definitions": ["easy"],
//            images: [],
//         },
//        "kanpe": {
//            "definitions": ["non locomotionally moving"],
//            images: [],
//         },
//        "lamo": {
//            "definitions": ["tall"],
//            images: [],
//         },
//        "tini": {
//            "definitions": ["short"],
//            images: [],
//         },
//        "lape": {
//            "definitions": ["sleeping", "dormant"],
//            images: [],
//         },
//        "lentu": {
//            "definitions": ["smooth"],
//            images: [],
//         },
//        "lete": {
//            "definitions": ["cold"],
//            images: [],
//         },
//        "seli": {
//            "definitions": ["hot"],
//            images: [],
//         },
//        "lili": {
//            "definitions": ["small"],
//            images: [],
//         },
//        "suli": {
//            "definitions": ["big"],
//            images: [],
//         },
//        "lon": {
//            "definitions": ["real", "existent"],
//            images: [],
//         },
//        "powe": {
//            "definitions": ["fake"],
//            images: [],
//         },
//        "minsu": {
//            "definitions": ["electric"],
//            images: [],
//         },
//        "mulu": {
//            "definitions": ["full", "complete"],
//            images: [],
//         },
//        "posi": {
//            "definitions": ["empty", "unstarted"],
//            images: [],
//         },
//        "munkin": {
//            "definitions": ["possible"],
//            images: [],
//         },
//        "musi": {
//            "definitions": ["artistic"],
//            images: [],
//         },
//        "mute": {
//            "definitions": ["many"],
//            images: [],
//         },
//        "tote": {
//            "definitions": ["few"],
//            images: [],
//         },
//        "nalama": {
//            "definitions": ["soft"],
//            images: [],
//         },
//        "ulokan": {
//            "definitions": ["hard", "metallic"],
//            images: [],
//         },
//        "nasa": {
//            "definitions": ["weird"],
//            images: [],
//         },
//        "satalan": {
//            "definitions": ["normal"],
//            images: [],
//         },
//        "no": {
//            "definitions": ["not"],
//            images: [],
//         },
//        "one": {
//            "definitions": ["weak"],
//            images: [],
//         },
//        "wawa": {
//            "definitions": ["strong"],
//            images: [],
//         },
//        "open": {
//            "definitions": ["start"],
//            images: [],
//         },
//        "pini": {
//            "definitions": ["end"],
//            images: [],
//         },
//        "sajo": {
//            "definitions": ["ongoing"],
//            images: [],
//         },
//        "pakala": {
//            "definitions": ["broken", "destroyed"],
//            images: [],
//         },
//        "pake": {
//            "definitions": ["interrputed"],
//            images: [],
//         },
//        "pilate": {
//            "definitions": ["endangered", "in danger"],
//            images: [],
//         },
//        "sulaki": {
//            "definitions": ["safe"],
//            images: [],
//         },
//        "pin": {
//            "definitions": ["as well", "also"],
//            images: [],
//         },
//        "pulono": {
//            "definitions": ["old"],
//            images: [],
//         },
//        "sin": {
//            "definitions": ["new", "young"],
//            images: [],
//         },
//        "puson": {
//            "definitions": ["follow", "obey"],
//            images: [],
//         },
//        "sata": {
//            "definitions": ["more (comparative)"],
//            images: [],
//         },
//        "kata": {
//            "definitions": ["less (comparative)"],
//            images: [],
//         },
//        "sipaja": {
//            "definitions": ["losing"],
//            images: [],
//         },
//        "wisaja": {
//            "definitions": ["winning", "victorious"],
//            images: [],
//         },
//        "pawita": {
//            "definitions": ["pure"],
//            images: [],
//         },
//        "unja": {
//            "definitions": ["mixed"],
//            images: [],
//         },
//        "suti": {
//            "definitions": ["specific", "detailed"],
//            images: [],
//         },
//        "ta": {
//            "definitions": ["opposite", "reflection"],
//            images: [],
//         },
//        "taso": {
//            "definitions": ["alone"],
//            images: [],
//         },
//        "tawonje": {
//            "definitions": ["together", "united", "in solidarity"],
//            images: [],
//         },
//        "tepaka": {
//            "definitions": ["tight", "firm"],
//            images: [],
//         },
//        "tewe": {
//            "definitions": ["connected", "in contact"],
//            images: [],
//         },
//        "tile": {
//            "definitions": ["slow"],
//            images: [],
//         },
//        "wiki": {
//            "definitions": ["fast"],
//            images: [],
//         },
//        "tula": {
//            "definitions": ["far"],
//            images: [],
//         },
//        "unpa": {
//            "definitions": ["sexual", "in state of intercourse"],
//            images: [],
//         },
//        "utala": {
//            "definitions": ["violent", "in state of violence", "in turmoil"],
//            images: [],
//         },
//        "weka": {
//            "definitions": ["abandoned", "removed"],
//            images: [],
//         }
//     },
//     "prepositions":{
//        "e": {
//            "definitions": ["direct object", "(accusative case)"],
//            images: [],
//         },
//        "ki": {
//            "definitions": ["towards", "to", "in order to", "(dative/allative case)"],
//            images: [],
//         },
//        "tan": {
//            "definitions": ["from", "(ablative case)"],
//            images: [],
//         },
//        "an": {
//            "definitions": ["in", "at", "on", "(locative case)"],
//            images: [],
//         },
//        "pelu": {
//            "definitions": ["using", "(instrumental case)"],
//            images: [],
//         },
//        "kan": {
//            "definitions": ["along with", "with", "(comitative case)"],
//            images: [],
//         },
//        "nen": {
//            "definitions": ["because of", "caused by", "(causal case)"],
//            images: [],
//         },
//        "su": {
//            "definitions": ["than", "as", "like", "(comparative)"],
//            images: [],
//         },
//        "pi": {
//            "definitions": ["of", "(genitive/relational case)"],
//            images: [],
//         }
//     },
//     "particles":{
//       "te": {
//           "definitions": ["noun clause marker", "relative clause marker"],
//           images: [],
//         },
//       "la": {
//           "definitions": ["prestated context marker"],
//           images: [],
//         },
//       "ita": {
//           "definitions": ["poststated context marker"],
//           images: [],
//         },
//       "seme": {
//           "definitions": ["interrogative placeholder"],
//           images: [],
//         },
//       "en": {
//           "definitions": ["and"],
//           images: [],
//         },
//       "lekin": {
//           "definitions": ["but", "howerever"],
//           images: [],
//         },
//       "anu": {
//           "definitions": ["or"],
//           images: [],
//         },
//       "wa": {
//           "definitions": ["to cause", "be the reason of", "cause", "causative modifier"],
//           images: [],
//         },
//       "o": {
//           "definitions": ["command marker", "wishful irrealis"],
//           images: [],
//         },
//       "li": {
//           "definitions": ["predicate marker"],
//           images: [],
//         },
//       "peko": {
//           "definitions": ["hello", "please", "sorry", "thank you"],
//           images: [],
//         },
//       "a": {
//           "definitions": ["ooh!", "interjection of agreement", "interjection of interest"],
//           images: [],
//         }
//     },
//     "bodyParts":{
//        "awo": {
//            "definitions": ["skin", "to touch", "to contact", "touching"],
//            images: [],
//         },
//        "ewin": {
//            "definitions": ["nail", "to scratch"],
//            images: [],
//         },
//        "lawa": {
//            "definitions": ["head", "to lead", "leading"],
//            images: [],
//         },
//        "luka": {
//            "definitions": ["hand", "to grab"],
//            images: [],
//         },
//        "noka": {
//            "definitions": ["foot", "to kick"],
//            images: [],
//         },
//        "talili": {
//            "definitions": ["finger", "to count"],
//            images: [],
//         },
//        "tanta": {
//            "definitions": ["teeth", "to bite"],
//            images: [],
//         },
//        "tijelo": {
//            "definitions": ["body", "to hug"],
//            images: [],
//         },
//        "titi": {
//            "definitions": ["breast", "chest", "to breastfeed"],
//            images: [],
//         },
//        "uta": {
//            "definitions": ["mouth", "to kiss"],
//            images: [],
//         }
//     },
//     "numbers":{
//        "wan": {
//            "definitions": ["1"],
//            images: [],
//         },
//        "tu": {
//            "definitions": ["2"],
//            images: [],
//         },
//        "san": {
//            "definitions": ["3"],
//            images: [],
//         },
//        "po": {
//            "definitions": ["4"],
//            images: [],
//         },
//        "lima": {
//            "definitions": ["5"],
//            images: [],
//         },
//        "sesi": {
//            "definitions": ["6"],
//            images: [],
//         },
//        "sepen": {
//            "definitions": ["7"],
//            images: [],
//         },
//        "oto": {
//            "definitions": ["8"],
//            images: [],
//         },
//        "newen": {
//            "definitions": ["9"],
//            images: [],
//         },
//        "ten": {
//            "definitions": ["10"],
//            images: [],
//         },
//        "kenta": {
//            "definitions": ["100"],
//            images: [],
//         },
//        "kilo": {
//            "definitions": ["1000"],
//            images: [],
//         },
//        "meka": {
//            "definitions": ["1,000,000"],
//            images: [],
//         },
//        "kika": {
//            "definitions": ["1,000,000,000"],
//            images: [],
//         },
//        "senti": {
//            "definitions": ["percent", "1/100"],
//            images: [],
//         }
//     }
// }

// Object.keys(wordz).forEach((section) => {
//     fs.mkdirSync(`./words/${section}`)
//     Object.keys(wordz[section]).forEach((word) => {
//         fs.mkdirSync(`./words/${section}/${word}`)
//         fs.writeFileSync(`./words/${section}/${word}/definition.txt`, wordz[section][word].definitions.join('\n'))
//     })
// })

const getWordDef = (section, word) => {
    return {
        definitions: fs
            .readFileSync(`./words/${section}/${word}/definition.txt`, { encoding: 'utf-8' })
            .split(/\r?\n/g),
        images: fs
            .readdirSync(`./words/${section}/${word}`)
            .filter((f) => f !== 'definition.txt')
            .map((f) => `/images/${section}/${word}/${f}`),
    };
};

const defs = fs.readdirSync('./words').reduce(
    (acc, section) => ({
        ...acc,
        [section]: fs
            .readdirSync(`./words/${section}`)
            .reduce((acc, word) => ({ ...acc, [word]: getWordDef(section, word) }), {}),
    }),
    {}
);

fs.writeFileSync('./public/words.json', JSON.stringify(defs, undefined, 2));


