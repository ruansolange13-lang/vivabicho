import { Animal } from '../types/animal';

export const INITIAL_MOCK_ANIMALS: Animal[] = [
  {
    id: 'anim-001',
    name: 'Thor',
    microchip: '982000361284920',
    species: 'cachorro',
    sex: 'macho',
    age: '3 anos',
    weight: '18 kg',
    entryDate: '20/07/2026',
    currentLocation: 'area_caes',
    status: 'no_abrigo',
    origin: 'guarda_municipal',
    originProtocol: 'GM-2026-0841',
    originNotes: 'Animal resgatado pela Guarda Municipal após denúncia de maus-tratos em via pública.',
    originTutorName: '', // Will display "Não identificado"
    originTutorContact: '', // Will display "Contato não informado"
    currentObservation: 'Animal sociável, alimentando-se bem e adaptado à área externa.',
    history: [
      {
        id: 'h-101',
        date: '20/07/2026 14:30',
        title: 'Entrada registrada',
        description: 'Entrada efetuada via Guarda Municipal (Protocolo: GM-2026-0841). Local inicial: Internação de Cães.',
        user: 'Dra. Camila Santos',
        iconType: 'create'
      },
      {
        id: 'h-102',
        date: '24/07/2026 10:15',
        title: 'Mudança de localização',
        description: 'Internação de Cães → Área de Cães. Animal liberado da triagem após alta veterinária.',
        user: 'Marcos Andrade (Tratador)',
        iconType: 'move'
      }
    ]
  },
  {
    id: 'anim-002',
    name: 'Luna',
    microchip: '', // Sem microchip
    species: 'gato',
    sex: 'femea',
    age: '', // Sem idade
    weight: '3.8 kg',
    entryDate: '22/07/2026',
    currentLocation: 'gatil',
    status: 'no_abrigo',
    origin: 'resgate_ong',
    originNotes: 'Resgatada pela equipe da ONG em terreno baldio próximo ao centro.',
    originTutorName: '',
    originTutorContact: '',
    currentObservation: 'Animal dócil, castrada e disponível para feira de adoção.',
    history: [
      {
        id: 'h-201',
        date: '22/07/2026 09:00',
        title: 'Entrada registrada',
        description: 'Resgate em campo realizado pela equipe de voluntários. Local inicial: Gatil.',
        user: 'Mariana Lima',
        iconType: 'create'
      }
    ]
  },
  {
    id: 'anim-003',
    name: 'Bob',
    microchip: '982000491823711',
    species: 'cachorro',
    sex: 'macho',
    age: '5 anos',
    weight: '14.5 kg',
    entryDate: '24/07/2026',
    currentLocation: 'internacao_caes',
    status: 'no_abrigo',
    origin: 'resgate_emergencia',
    originNotes: 'Atropelamento na Rodovia SP-101. Encaminhado às pressas para medicação de emergência.',
    originTutorName: 'Roberto Alves',
    originTutorContact: '(19) 98122-4433',
    currentObservation: 'Em observação pós-trauma. Apresenta melhora nas funções motoras. Necessita curativo diário.',
    history: [
      {
        id: 'h-301',
        date: '24/07/2026 18:40',
        title: 'Entrada registrada',
        description: 'Atendimento de emergência. Localização inicial: Internação de Cães.',
        user: 'Dr. Lucas Ferreira',
        iconType: 'create'
      }
    ]
  },
  {
    id: 'anim-004',
    name: 'Mel',
    microchip: '',
    species: 'gato',
    sex: 'femea',
    age: '2 meses',
    weight: '', // Sem peso informado
    entryDate: '25/07/2026',
    currentLocation: 'internacao_gatos',
    status: 'no_abrigo',
    origin: 'entrega_voluntaria',
    originNotes: 'Filhote eitrada com quadro de desidratação severa entregue por morador local.',
    originTutorName: 'Ana Paula Rocha',
    originTutorContact: '(19) 99771-0022',
    currentObservation: 'Em soroterapia e aquecimento. Alimentando-se com sachê de filhotes.',
    history: [
      {
        id: 'h-401',
        date: '25/07/2026 11:20',
        title: 'Entrada registrada',
        description: 'Entrega voluntária na sede da ONG. Localização inicial: Internação de Gatos.',
        user: 'Juliana Costa',
        iconType: 'create'
      }
    ]
  },
  {
    id: 'anim-005',
    name: 'Rex',
    microchip: '982000112233445',
    species: 'cachorro',
    sex: 'macho',
    age: '4 anos',
    weight: '22 kg',
    entryDate: '15/07/2026',
    currentLocation: 'area_caes',
    status: 'no_abrigo',
    origin: 'terceiros',
    originNotes: 'Encontrado por transeuntes e mantido temporariamente até abertura de vaga.',
    originTutorName: '',
    originTutorContact: '',
    currentObservation: 'Enérgico, sociável com outros cães de grande porte.',
    history: [
      {
        id: 'h-501',
        date: '15/07/2026 16:00',
        title: 'Entrada registrada',
        description: 'Registrado na área de cães adultos.',
        user: 'Camila Santos',
        iconType: 'create'
      }
    ]
  },
  {
    id: 'anim-006',
    name: 'Mimi',
    microchip: '982000554433221',
    species: 'gato',
    sex: 'femea',
    age: '1 ano',
    weight: '3.2 kg',
    entryDate: '10/07/2026',
    currentLocation: 'gatil',
    status: 'no_abrigo',
    origin: 'resgate_ong',
    originNotes: 'Resgate de colônia de gatos.',
    originTutorName: '',
    originTutorContact: '',
    currentObservation: 'Tímida, mas aceita carinho no horário da alimentação.',
    history: [
      {
        id: 'h-601',
        date: '10/07/2026 10:00',
        title: 'Entrada registrada',
        description: 'Acolhida diretamente no Gatil Principal.',
        user: 'Mariana Lima',
        iconType: 'create'
      }
    ]
  },
  {
    id: 'anim-007',
    name: 'Pipoca',
    microchip: '982000887766554',
    species: 'cachorro',
    sex: 'femea',
    age: '1 ano',
    weight: '8 kg',
    entryDate: '01/06/2026',
    currentLocation: 'area_caes',
    status: 'adotado',
    origin: 'entrega_voluntaria',
    originNotes: 'Entregue por família sem condições de mantê-la.',
    originTutorName: 'Sérgio Mendes',
    originTutorContact: '(19) 98833-2211',
    currentObservation: 'Adoção concluída com sucesso após entrevista com novo tutor.',
    history: [
      {
        id: 'h-701',
        date: '01/06/2026 14:00',
        title: 'Entrada registrada',
        description: 'Entrada no abrigo em perfeitas condições de saúde.',
        user: 'Juliana Costa',
        iconType: 'create'
      },
      {
        id: 'h-702',
        date: '20/07/2026 15:30',
        title: 'Adoção registrada',
        description: 'Adotada por Beatriz Ferreira com termo assinado e microchipagem atualizada.',
        user: 'Mariana Lima',
        iconType: 'adopt'
      }
    ],
    adoptionDetails: {
      adoptionDate: '20/07/2026',
      exitDate: '20/07/2026',
      adopterName: 'Beatriz Ferreira Guimarães',
      adopterContact: '(19) 99182-3344',
      adopterAddress: 'Rua das Flores, 142 - Apto 32, Jardim Primavera',
      notes: 'Tutor assinou termo de responsabilidade e concordou com visitas pós-adoção.'
    }
  },
  {
    id: 'anim-008',
    name: 'Belinha',
    microchip: '',
    species: 'gato',
    sex: 'femea',
    age: '6 anos',
    weight: '4.1 kg',
    entryDate: '12/05/2026',
    currentLocation: 'gatil',
    status: 'adotado',
    origin: 'resgate_ong',
    originNotes: 'Resgatada em feira livre com machucado no joelho.',
    originTutorName: '',
    originTutorContact: '',
    currentObservation: 'Animal curado e adotado por família experiente com felinos.',
    history: [
      {
        id: 'h-801',
        date: '12/05/2026 11:00',
        title: 'Entrada registrada',
        description: 'Registrada e acolhida.',
        user: 'Camila Santos',
        iconType: 'create'
      },
      {
        id: 'h-802',
        date: '18/07/2026 11:00',
        title: 'Adoção registrada',
        description: 'Adotada por Carlos Eduardo e Sandra.',
        user: 'Camila Santos',
        iconType: 'adopt'
      }
    ],
    adoptionDetails: {
      adoptionDate: '18/07/2026',
      exitDate: '18/07/2026',
      adopterName: 'Carlos Eduardo Nogueira',
      adopterContact: '(19) 98455-1122',
      adopterAddress: 'Av. Brasil, 890 - Centro',
      notes: 'Casa totalmente telada e segura para gatos.'
    }
  },
  {
    id: 'anim-009',
    name: 'Barão',
    microchip: '982000223344112',
    species: 'cachorro',
    sex: 'macho',
    age: '12 anos',
    weight: '26 kg',
    entryDate: '02/07/2026',
    currentLocation: 'internacao_caes',
    status: 'obito',
    origin: 'guarda_municipal',
    originProtocol: 'GM-2026-0610',
    originNotes: 'Animal idoso resgatado em estado crítico de desnutrição e insuficiência renal.',
    originTutorName: '',
    originTutorContact: '',
    currentObservation: 'Veio a óbito na internação apesar dos cuidados intensivos.',
    history: [
      {
        id: 'h-901',
        date: '02/07/2026 17:00',
        title: 'Entrada registrada',
        description: 'Internação de emergência para fluidoterapia e suporte idoso.',
        user: 'Dr. Lucas Ferreira',
        iconType: 'create'
      },
      {
        id: 'h-902',
        date: '19/07/2026 04:20',
        title: 'Óbito registrado',
        description: 'Parada cardiorrespiratória em decorrência de falência renal crônica avançada.',
        user: 'Dra. Camila Santos',
        iconType: 'death'
      }
    ],
    deathDetails: {
      deathDate: '19/07/2026',
      exitDate: '19/07/2026',
      notes: 'Animal recebeu tratamento paliativo completo com analgesia. Laudo necroscópico arquivado.'
    }
  },
  {
    id: 'anim-010',
    name: 'Sombra',
    microchip: '',
    species: 'gato',
    sex: 'macho',
    age: '14 anos',
    weight: '2.9 kg',
    entryDate: '18/06/2026',
    currentLocation: 'internacao_gatos',
    status: 'obito',
    origin: 'terceiros',
    originNotes: 'Encontrado muito fraco no abrigo temporário.',
    originTutorName: '',
    originTutorContact: '',
    history: [
      {
        id: 'h-1001',
        date: '18/06/2026 10:00',
        title: 'Entrada registrada',
        description: 'Acolhimento geriátrico felino.',
        user: 'Juliana Costa',
        iconType: 'create'
      },
      {
        id: 'h-1002',
        date: '12/07/2026 21:10',
        title: 'Óbito registrado',
        description: 'Óbito em decorrência de complicação hepática grave.',
        user: 'Dra. Camila Santos',
        iconType: 'death'
      }
    ],
    deathDetails: {
      deathDate: '12/07/2026',
      exitDate: '13/07/2026',
      notes: 'Acompanhamento veterinário constante durante a internação.'
    }
  },
  {
    id: 'anim-011',
    name: 'Toby',
    microchip: '982000998877112',
    species: 'cachorro',
    sex: 'macho',
    age: '2 anos',
    weight: '11 kg',
    entryDate: '26/07/2026',
    currentLocation: 'area_caes',
    status: 'no_abrigo',
    origin: 'resgate_ong',
    originNotes: 'Resgatado em praça pública com ferimento leve na pata traseira.',
    originTutorName: '',
    originTutorContact: '',
    currentObservation: 'Ativo, saudável, aguardando término do esquema vacinal.',
    history: [
      {
        id: 'h-1101',
        date: '26/07/2026 08:00',
        title: 'Entrada registrada',
        description: 'Registrado e alocado diretamente na Área de Cães.',
        user: 'Marcos Andrade',
        iconType: 'create'
      }
    ]
  },
  {
    id: 'anim-012',
    name: 'Simba',
    microchip: '',
    species: 'gato',
    sex: 'macho',
    age: '8 meses',
    weight: '2.8 kg',
    entryDate: '26/07/2026',
    currentLocation: 'gatil',
    status: 'no_abrigo',
    origin: 'entrega_voluntaria',
    originNotes: 'Entregue por vizinhos de casa abandonada.',
    originTutorName: '',
    originTutorContact: '',
    currentObservation: 'Animal brincalhão e saúdavel.',
    history: [
      {
        id: 'h-1201',
        date: '26/07/2026 09:30',
        title: 'Entrada registrada',
        description: 'Gatil Principal.',
        user: 'Mariana Lima',
        iconType: 'create'
      }
    ]
  }
];
