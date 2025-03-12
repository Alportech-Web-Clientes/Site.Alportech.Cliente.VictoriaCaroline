document.addEventListener("DOMContentLoaded", () => {
    // Navigation
    const menuItems = document.querySelectorAll(".menu li")
    const contentSections = document.querySelectorAll(".content-section")
    const viewAllButtons = document.querySelectorAll(".view-all")

    // Menu item click handler
    menuItems.forEach((item) => {
        item.addEventListener("click", function () {
            // Remove active class from all menu items
            menuItems.forEach((menuItem) => {
                menuItem.classList.remove("active")
            })

            // Add active class to clicked item
            this.classList.add("active")

            // Hide all content sections
            contentSections.forEach((section) => {
                section.classList.remove("active")
            })

            // Show the corresponding content section
            const target = this.getAttribute("data-target")
            document.getElementById(target).classList.add("active")

            // On mobile, scroll to top after navigation
            if (window.innerWidth <= 768) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
        })
    })

    // View all buttons click handler
    viewAllButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const target = this.getAttribute("data-target")

            // Find and click the corresponding menu item
            menuItems.forEach((item) => {
                if (item.getAttribute("data-target") === target) {
                    item.click()
                }
            })
        })
    })

    // Project filters
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-grid .project-card")
    const filterContainer = document.querySelector(".filter-container")

    // Handle filter container scroll indicators
    function updateFilterScrollState() {
        if (!filterContainer) return

        const filterButtonsContainer = filterContainer.querySelector(".filter-buttons")
        if (!filterButtonsContainer) return

        // Check if there's horizontal scroll
        const hasScroll = filterButtonsContainer.scrollWidth > filterButtonsContainer.clientWidth

        if (!hasScroll) {
            filterContainer.classList.add("scroll-start", "scroll-end")
            return
        }

        // Check if scrolled to the left edge
        if (filterButtonsContainer.scrollLeft <= 10) {
            filterContainer.classList.add("scroll-start")
        } else {
            filterContainer.classList.remove("scroll-start")
        }

        // Check if scrolled to the right edge
        if (
            filterButtonsContainer.scrollLeft + filterButtonsContainer.clientWidth >=
            filterButtonsContainer.scrollWidth - 10
        ) {
            filterContainer.classList.add("scroll-end")
        } else {
            filterContainer.classList.remove("scroll-end")
        }
    }

    // Initialize filter scroll state
    updateFilterScrollState()

    // Update scroll indicators when scrolling
    if (filterContainer) {
        const filterButtonsContainer = filterContainer.querySelector(".filter-buttons")
        if (filterButtonsContainer) {
            filterButtonsContainer.addEventListener("scroll", updateFilterScrollState)

            // Also update on resize
            window.addEventListener("resize", updateFilterScrollState)
        }
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Remove active class from all filter buttons
            filterButtons.forEach((btn) => btn.classList.remove("active"))

            // Add active class to clicked button
            this.classList.add("active")

            const filter = this.getAttribute("data-filter")

            // Show/hide projects based on filter
            projectCards.forEach((card) => {
                const categories = card.getAttribute("data-category").split(" ") // Transforma em array

                if (filter === "all" || categories.includes(filter)) {
                    card.style.display = "block"
                } else {
                    card.style.display = "none"
                }
            })
        })
    })

    // Contact form submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            // Get form values
            const name = document.getElementById("name").value
            const email = document.getElementById("email").value
            const subject = document.getElementById("subject").value
            const message = document.getElementById("message").value

            // Simulate form submission (in a real project, you'd send this to a server)
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.\n\nResponderemos em breve no email: ${email}`)

            // Reset form
            contactForm.reset()
        })
    }

    // Responsive adjustments
    function handleResponsive() {
        if (window.innerWidth <= 768) {
            // Mobile layout adjustments
            document.querySelector(".sidebar").style.position = "relative"
            document.querySelector(".main-content").style.marginLeft = "0"
        } else {
            // Desktop layout adjustments
            document.querySelector(".sidebar").style.position = "fixed"
            document.querySelector(".main-content").style.marginLeft = "260px"
        }
    }

    // Handle responsive layout on load and resize
    handleResponsive()
    window.addEventListener("resize", handleResponsive)

    // Project Modal Functionality
    const modal = document.getElementById("projectModal")
    const closeModalBtn = document.querySelector(".close-modal")

    // Project data - in a real application, this would come from a database
    const projectsData = [
        {
            id: "adapta-keraciaba",
            title: "Programa Adapta Keraciaba: Pesquisa-ação crítica para adaptação climática e redução de desastres",
            image: "/img/about.jpg",
            description:
                "O Programa Adapta Keraciaba busca desenvolver ações de enfrentamento aos riscos de desastres e adaptação climática em comunidades da zona leste de São Paulo. A iniciativa envolve pesquisa-ação crítica e atividades educativas com moradores dos territórios do Jardim Keralux e Vila Guaraciaba, promovendo a comunicação, percepção dos riscos e participação ativa da comunidade. Em parceria com a universidade, o programa fomenta o diálogo entre pesquisadores e a população para a construção de soluções sustentáveis e inclusivas.",
            objectives: [
                "Fortalecer a comunicação e percepção dos riscos de desastres entre a população local",
                "Estimular o desenvolvimento de ações comunitárias para a adaptação climática",
                "Apoiar a produção e revisão de materiais educativos e relatórios científicos",
                "Participar de eventos e reuniões com os moradores para fomentar o engajamento comunitário",
                "Aplicar ferramentas de gestão de projetos para organização e efetividade das ações",
                "Apoiar a formação acadêmica dos estudantes envolvidos no programa"
            ],
            results:
                "Engajamento direto com moradores das comunidades do Jardim Keralux e Vila Guaraciaba, participação ativa em eventos e reuniões, apoio na produção de materiais educativos e científicos, além da aplicação de metodologias de gestão para aprimorar a efetividade do programa. A iniciativa resultou no fortalecimento da comunicação sobre riscos e adaptação climática, incentivando práticas sustentáveis e colaborativas entre a comunidade e a universidade.",
            tags: ["Adaptação Climática", "Redução de Desastres", "Engajamento Comunitário", "Pesquisa-Ação", "Sustentabilidade"]
        },
        {
            id: "adapta-keraciaba-trilhas",
            title: "Programa Adapta Keraciaba: Trilhas de formação e divulgação científica para Adaptação Climática e Redução de Risco de Desastres",
            image: "/img/about.jpg",
            description:
                "O Programa Adapta Keraciaba desenvolve trilhas de formação e ações de divulgação científica voltadas para adaptação climática e redução de riscos de desastres. A iniciativa promove a comunicação e percepção dos riscos por meio de atividades educativas, oficinas e eventos que envolvem diretamente as comunidades da zona leste de São Paulo e a Universidade, incentivando o diálogo e o engajamento comunitário na busca por soluções sustentáveis e resilientes.",
            objectives: [
                "Promover a formação de estudantes e moradores em temas de adaptação climática e redução de riscos",
                "Fortalecer a comunicação científica e a percepção dos riscos nas comunidades locais",
                "Produzir e revisar materiais educativos e científicos sobre mudanças climáticas e desastres",
                "Fomentar o diálogo entre a comunidade, pesquisadores e instituições para soluções sustentáveis",
                "Apoiar a participação ativa da comunidade em eventos, reuniões e oficinas formativas",
                "Aplicar ferramentas de gestão de projetos para organização e efetividade das ações"
            ],
            results:
                "Realização de trilhas formativas para estudantes e moradores, produção de materiais educativos e científicos, participação ativa em eventos e reuniões comunitárias, e fortalecimento do diálogo entre a academia e a sociedade. O programa impactou diretamente a percepção dos riscos e incentivou ações colaborativas para adaptação climática e redução de desastres.",
            tags: ["Adaptação Climática", "Redução de Riscos", "Divulgação Científica", "Engajamento Comunitário", "Educação Ambiental"]
        },
        {
            id: "adapta-keraciaba-historia",
            title: "Programa Adapta Keraciaba: A história das comunidades na gestão de riscos de desastres e adaptação climática",
            image: "/img/about.jpg",
            description:
                "Este programa visa registrar e valorizar a história das comunidades na gestão de riscos de desastres e adaptação climática, promovendo a comunicação e percepção dos riscos através de narrativas comunitárias. A iniciativa fortalece o diálogo entre os moradores da zona leste de São Paulo e a Universidade, incentivando a participação ativa em estratégias de enfrentamento e resiliência ambiental.",
            objectives: [
                "Documentar e divulgar histórias das comunidades sobre gestão de riscos e adaptação climática",
                "Fortalecer a comunicação e percepção dos riscos ambientais",
                "Estimular o diálogo entre comunidade, pesquisadores e instituições",
                "Apoiar a produção e revisão de materiais educativos e científicos",
                "Capacitar estudantes e moradores para a participação em ações de resiliência ambiental",
                "Utilizar ferramentas de gestão de projetos para organização das atividades"
            ],
            results:
                "Registro e divulgação de narrativas comunitárias, participação ativa dos moradores em eventos e oficinas, produção de materiais educativos e fortalecimento da resiliência local. O programa contribuiu para a valorização do conhecimento comunitário e o aprimoramento das estratégias de adaptação climática e redução de desastres.",
            tags: ["Gestão de Riscos", "Adaptação Climática", "Narrativas Comunitárias", "Engajamento Comunitário", "Educação Ambiental"]
        },
        {
            id: "adapta-keraciaba-cartografia",
            title: "Adapta Keraciaba: Cartografia Social e História Oral dos Riscos Socioambientais do Território",
            image: "/img/about.jpg",
            description:
                "Este projeto utiliza a cartografia social e a história oral para mapear riscos socioambientais e registrar as memórias das comunidades do Jardim Keralux e Vila Guaraciaba. A iniciativa promove a participação ativa dos moradores na identificação de desafios e potencialidades do território, incentivando a preservação das narrativas locais e a conscientização sobre a gestão de riscos.",
            objectives: [
                "Realizar mapeamento participativo dos riscos e potencialidades socioambientais",
                "Coletar relatos e registros audiovisuais sobre desastres e lutas comunitárias",
                "Desenvolver produtos cartográficos e materiais de divulgação científica",
                "Fortalecer o engajamento comunitário na gestão de riscos",
                "Preservar e difundir as memórias das comunidades através da história oral"
            ],
            results:
                "Mapeamento participativo realizado, coleta e registro de relatos comunitários, desenvolvimento de produtos cartográficos e fortalecimento da identidade territorial. O projeto contribuiu para a valorização do conhecimento local e a ampliação da percepção de riscos socioambientais nas comunidades envolvidas.",
            tags: ["Mapeamento Participativo", "História Oral", "Cartografia Social", "Gestão de Riscos", "Engajamento Comunitário"]
        },
        {
            id: "adapta-keraciaba-gestao",
            title: "Gestão de Riscos de Desastres e Adaptação Climática: Programa Adapta Keraciaba",
            image: "/img/about.jpg",
            description: "O projeto teve como objetivo fortalecer a gestão de riscos de desastres e a adaptação climática por meio da mobilização comunitária, formações socioambientais e ações educativas no Jardim Keralux e Vila Guaraciaba. A iniciativa envolveu a comunidade na identificação de riscos e na construção de soluções locais.",
            objectives: [
                "Realizar formações socioambientais com moradores e integrantes do projeto",
                "Facilitar oficinas e encontros sobre redução de riscos e adaptação climática",
                "Produzir materiais de comunicação socioambiental e educativos",
                "Sistematizar e divulgar dados e informações científicas sobre o tema",
                "Engajar a comunidade na prevenção de desastres e na adaptação climática"
            ],
            results: "Foram realizadas formações, oficinas e encontros comunitários, promovendo o fortalecimento da gestão de riscos e a mobilização local. O projeto também resultou na produção de materiais educativos e na ampliação da conscientização sobre a adaptação climática nas comunidades envolvidas.",
            tags: [
                "Gestão de Projetos",
                "Educação Ambiental",
                "Engajamento Comunitário",
                "Planejamento Ambiental",
                "Adaptação Climática"
            ]
        },
        {
            id: "errd-ln",
            title: "Estruturação e Fortalecimento da Rede de Educação e Redução de Riscos de Desastres no Litoral Norte de SP (ERRD-LN)",
            image: "/img/about.jpg",
            description: "Este projeto teve como objetivo estruturar e fortalecer a Rede de Educação e Redução de Riscos de Desastres no Litoral Norte de São Paulo, promovendo ações de comunicação, engajamento comunitário e educação socioambiental. A iniciativa envolveu diversos atores institucionais e comunitários na construção de estratégias para minimizar riscos e aumentar a resiliência local.",
            objectives: [
                "Apoiar a comunicação da Rede ERRD-LN em redes sociais e mídias digitais",
                "Desenvolver postagens, mídias e campanhas educativas",
                "Fortalecer projetos locais de educação e redução de riscos no Litoral Norte de SP",
                "Sistematizar e divulgar informações sobre riscos de desastres",
                "Promover articulação entre pesquisadores, escolas, ONGs e órgãos públicos"
            ],
            results: "O projeto resultou no fortalecimento da Rede ERRD-LN, ampliação da divulgação científica e mobilização comunitária. Foram produzidos materiais educativos, campanhas digitais e realizadas reuniões estratégicas com diversos atores locais para promover a redução de riscos de desastres.",
            tags: [
                "Educação Ambiental",
                "Engajamento Comunitário",
                "Redução de Riscos",
                "Comunicação Socioambiental",
                "Pesquisa Aplicada"
            ]
        },
        {
            id: "educacao-ambiental-rrd",
            title: "Educação Ambiental e Redução de Risco de Desastres: uma abordagem crítica na Zona Leste de São Paulo",
            image: "/img/about.jpg",
            description: "Este projeto promove a Educação Ambiental Crítica e a Redução de Riscos de Desastres no ensino público da Zona Leste de São Paulo. A iniciativa envolve planejamento e execução de cursos, oficinas e workshops, além de diagnósticos socioambientais e elaboração de planos de ação para comunidades vulneráveis.",
            objectives: [
                "Oferecer curso de curta duração sobre Educação Ambiental e Redução de Riscos de Desastres",
                "Criar materiais educativos para escolas públicas e comunidades",
                "Facilitar oficinas e workshops para estudantes e moradores",
                "Realizar diagnóstico socioambiental e planejamento de ações para gestão de riscos",
                "Monitorar e avaliar os impactos do projeto através de indicadores e relatórios"
            ],
            results: "O projeto resultou na capacitação de estudantes e moradores, na produção de materiais educativos, na realização de um diagnóstico socioambiental em Ermelino Matarazzo e na formulação de um plano de gestão de riscos locais. Também fortaleceu a participação comunitária e ampliou o conhecimento sobre desastres socioambientais.",
            tags: ["Educação Ambiental", "Gestão de Riscos", "Engajamento Comunitário", "Monitoramento de Projetos", "Planejamento Estratégico"]
        },
        {
            id: "democracia-artes-saberes",
            title: "Democracia, Artes e Saberes Plurais",
            image: "/img/about.jpg",
            description: "O projeto busca compreender a realidade socioeconômica e cultural dos bairros vizinhos à USP Leste por meio de pesquisa de campo, entrevistas e articulação comunitária. A iniciativa visa fortalecer a democracia participativa e a valorização dos saberes locais.",
            objectives: [
                "Realizar pesquisa de campo no Jardim Keralux e bairros vizinhos",
                "Conduzir entrevistas periódicas com moradores para levantamento de dados",
                "Divulgar e aplicar o Censo comunitário",
                "Articular parcerias com atores-chave da comunidade",
                "Elaborar um diagnóstico socioeconômico e cultural da região"
            ],
            results: "O projeto permitiu um mapeamento detalhado das condições sociais e culturais da região, facilitando a criação de estratégias para desenvolvimento local. Além disso, fortaleceu o vínculo entre a universidade e a comunidade por meio da pesquisa participativa.",
            tags: ["Pesquisa de Campo", "Articulação Comunitária", "Coleta de Dados", "Diagnóstico Socioeconômico", "Engajamento Social"]
        }
    ]

    // Add click event to all project cards
    document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("click", function () {
            // Get the categories of the clicked project (array)
            const categories = this.getAttribute("data-category").split(" ")

            // Find the first matching project data
            let projectData = projectsData.find((p) => categories.includes(p.id))

            if (projectData) {
                // Populate modal with project data
                document.getElementById("modalTitle").textContent = projectData.title
                document.getElementById("modalImage").src = projectData.image
                document.getElementById("modalImage").alt = projectData.title
                document.getElementById("modalDescription").textContent = projectData.description

                // Clear and populate objectives
                const objectivesList = document.getElementById("modalObjectives")
                objectivesList.innerHTML = ""
                projectData.objectives.forEach((objective) => {
                    const li = document.createElement("li")
                    li.textContent = objective
                    objectivesList.appendChild(li)
                })

                document.getElementById("modalResults").textContent = projectData.results

                // Clear and populate tags
                const tagsContainer = document.getElementById("modalTags")
                tagsContainer.innerHTML = ""
                projectData.tags.forEach((tag) => {
                    const span = document.createElement("span")
                    span.textContent = tag
                    tagsContainer.appendChild(span)
                })

                // Show modal
                const modal = document.getElementById("projectModal")
                modal.style.display = "block"
                setTimeout(() => {
                    modal.classList.add("show")
                }, 10)
                document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
            }
        })
    })


    // Close modal when close button is clicked
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("show")
        setTimeout(() => {
            modal.style.display = "none"
        }, 300)
        document.body.style.overflow = "" // Re-enable scrolling
    })

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show")
            setTimeout(() => {
                modal.style.display = "none"
            }, 300)
            document.body.style.overflow = "" // Re-enable scrolling
        }
    })

    // Stories Functionality
    const storiesData = [
        {
            id: "story1",
            title: "Carnaval no Parque da Água Branca",
            images: [
                "/img/stories/1/1.jpg",
                "/img/stories/1/2.jpg",
                "/img/stories/1/3.jpg",
                "/img/stories/1/4.jpg",
                "/img/stories/1/5.jpg",
                "/img/stories/1/6.jpg",
            ],
            text: "O carnaval foi muito bem celebrado pela equipe educativa do Parque da Água Branca!\n\n" +
                "<br></br>" +
                "Na semana do carnaval, o público teve a oportunidade de vivenciar e ter contato com diversos elementos culturais que estão inseridos nessa festa popular. Algumas das atividades foram:\n" +
                "<br></br>" +
                "🌿 Confecção de máscaras utilizando elementos naturais\n" +
                "<br></br>" +
                "🌿 Confecção de instrumentos com fitas e materiais recicláveis\n" +
                "<br></br>" +
                "🌿 Confecção de coroas com elementos naturais\n" +
                "<br></br>" +
                "🌿 Confecção de mini estandarte\n\n" +
                "<br></br>" +
                "Além dessas atividades, no dia 02/03 também ocorreu o 2º Cortejo “Festejos no parque”. Nesta edição, realizamos uma parceria com o Baile da Melhor Idade que ocorre no parque semanalmente. Resultado: tivemos um cortejo com pessoas de todas as idades e que foi super animado, colorido e cheio de sorrisos!\n" +
                "<br></br>" +
                "A realização de articulações e parcerias com grupos que utilizam o parque e organizações locais são fundamentais para ampliar o diálogo e potencializar a conexão e a relação de pertencimento do público com o patrimônio ambiental, cultural e histórico do parque.\n" +
                "<br></br>" +
                "Agradeço às equipes de Educação Ambiental e Cultural do parque pelo apoio e co-construção dessa programação tão divertida e conectada à natureza!",
        },
        {
            id: "story2",
            title: "Cores da Natureza: Workshop Ensina Pintura com Tintas Naturais no Parque da Água Branca",
            images: [
                "/img/stories/2/1.jpg",
                "/img/stories/2/2.jpg",
                "/img/stories/2/3.jpg",
                "/img/stories/2/4.jpg",
                "/img/stories/2/5.jpg",
                "/img/stories/2/6.jpg",
                "/img/stories/2/7.jpg",
                "/img/stories/2/8.jpg",
            ],
            text: "O que a beterraba, couve-manteiga, hibisco, açafrão, terra, urucum e espinafre têm em comum?" +
                "<br></br>" +
                "Podem ser usadas para fazer tintas da natureza!" +
                "<br></br>" +
                "E, no último domingo (16/02), o público do Parque da Água Branca teve a oportunidade de criar pinturas com tintas naturais em um workshop oferecido pela equipe de Educação Ambiental. " +
                "<br></br>" +
                "Na primeira parte, os(as) participantes puderam experimentar a criação de diversas cores, a partir da mistura desses elementos da natureza! Depois, o público foi incentivado a desenvolver pinturas tendo o parque como inspiração. " +
                "<br></br>" +
                "Já realizamos essa oficina algumas vezes e a cada edição nós incluímos mais elementos naturais e mais cores! É um verdadeiro experimento. " +
                "<br></br>" +
                "Agradeço a toda a equipe que apoiou o planejamento e execução da oficina: Larissa Yukie Biajoli Kuchiama, Agnes Roberta Costa, Vanessa França e Julia Alcantara.",
        },
        {
            id: "story3",
            title: "Dia Mundial da Educação Ambiental: Reflexões e Propósito na Jornada Profissional",
            images: [
                "/img/stories/3/1.jpg",
            ],
            text: "Dia de celebrar, refletir e se engajar!" +
                "<br></br>" +
                "Quando eu estava no Ensino Fundamental e ainda não tinha definido muito bem a graduação que eu queria fazer, eu só tinha uma certeza: “quero trabalhar com Educação Ambiental”. " +
                "<br></br>" +
                "E, felizmente, eu estou realizando essa certeza do passado, hehe!" +
                "<br></br>" +
                "Desde 2019 (quando iniciei oficialmente essa jornada), eu tive a oportunidade de desenvolver aspectos teóricos e práticos em diversas abordagens da Educação Ambiental na Universidade, em escolas públicas, em comunidades, em parques urbanos, em Unidades Básicas de Saúde (UBS) e nas redes sociais. " +
                "<br></br>" +
                "Me sinto realizada em poder contribuir com esse trabalho e propósito tão importantes para a vida no planeta. " +
                "<br></br>" +
                "Ontem foi o Dia Mundial da Educação Ambiental (26/01) e desejo a todos e todas os(as) colegas de profissão muita coragem e brilho nos olhos para enfrentarem os desafios (sim, temos muitos!).",
        },
        {
            id: "story4",
            title: "Conexão com a Natureza: Educação Ambiental e Aprendizado no Parque da Água Branca",
            images: [
                "/img/stories/4/1.jpg",
                "/img/stories/4/2.jpg",
                "/img/stories/4/3.jpg",
                "/img/stories/4/4.jpg",
                "/img/stories/4/5.jpg",
                "/img/stories/4/6.jpg",
                "/img/stories/4/7.jpg",
                "/img/stories/4/8.jpg",
                "/img/stories/4/9.jpg",
                "/img/stories/4/10.jpg",
                "/img/stories/4/11.jpg",
                "/img/stories/4/12.jpg",
                "/img/stories/4/13.jpg",
                "/img/stories/4/14.jpg",
                "/img/stories/4/15.jpg",
            ],
            text: "2025 já iniciou com muita conexão com o patrimônio ambiental e fortalecimento dos saberes interdisciplinares!" +
                "<br></br>" +
                "Em janeiro, a equipe educativa do Parque da Água Branca deu continuidade à programação de férias. Os pontos de destaques desta programação, foram: " +
                "<br></br>" +
                "🌿 Conectar os visitantes com o patrimônio histórico, cultural e ambiental do parque" +
                "<br></br>" +
                "🍃 Acompanhar e apoiar a protagonização das Auxiliares de Educação na condução das atividades" +
                "<br></br>" +
                "🍂 Fortalecer e valorizar os conhecimentos e habilidades interdisciplinares da equipe" +
                "<br></br>" +
                "A experiência de estimular, apoiar e dar suporte às Auxiliares na condução de atividades tem contribuído muito para o meu desenvolvimento profissional e pessoal, principalmente, para o aperfeiçoamento de habilidades de escuta, comunicação, liderança e capacidade de tomada de decisão." +
                "<br></br>" +
                "Dentre as atividades, destacam-se: " +
                "<br></br>" +
                "🟢 \"Caminhada para conhecer as árvores Gigantes do Água Branca\" com a participação das auxiliares Julia Alcantara, Sophia Imene e Daniela Santin Apahaza e da educadora Vanessa França." +
                "<br></br>" +
                "🟢 \"Desenho de observação com elementos naturais\" que foi ministrada pela Auxiliar Larissa Yukie Biajoli Kuchiama" +
                "<br></br>" +
                "🟢 \"Árvores da Mata Atlântica\" com a participação da Julia Alcantara e Sophia Imene" +
                "<br></br>" +
                "🟢 \"Oficina de fotografia: Fotografe com seu celular\" que foi ministrada pela Auxiliar Agnes Roberta Costa." +
                "<br></br>" +
                "Deu um quentinho no coração ter participado das atividades, saber que deu tudo certo e que o público se divertiu e se conectou com os elementos do parque. Muito obrigada equipe, aprendo muito com vocês!",
        },
        {
            id: "story5",
            title: "Reflexões e Conquistas: Um Olhar Sobre 2024 e os Aprendizados para 2025",
            images: [
                "/img/stories/5/1.jpg",
                "/img/stories/5/2.jpg",
            ],
            text: "2024 foi um ano cheio." +
                "<br><br>" +
                "De cursos, formações, atividades, avaliações, desafios, estudos e muito mais. Eu aprendi muito com cada passo dado e amadureci muitos aspectos profissionais e pessoais. Encerro o ano realizada e com a certeza e alegria de saber que em 2025 novos aprendizados me aguardam. Fiz um resumo com os momentos profissionais mais marcantes para mim desse ano." +
                "<br><br>" +
                "🌻 Para as realizações coletivas, agradeço a toda a equipe de Educação Ambiental e do grupo Adapta Keraciaba, pois sem muita colaboração, trabalho em equipe, diálogo e paciência, nada disso seria possível." +
                "<br><br>" +
                "Até o ano que vem."
        },
    ]

    const storiesViewer = document.getElementById("storiesViewer")
    const storiesContent = document.querySelector(".stories-content")
    const storyItems = document.querySelectorAll(".story-item")
    const closeStoriesBtn = document.querySelector(".close-stories")
    const prevBtn = document.querySelector(".stories-prev")
    const nextBtn = document.querySelector(".stories-next")
    const progressFill = document.querySelector(".progress-fill")

    let currentStoryIndex = 0
    let currentImageIndex = 0
    const storyDuration = 3000
    let storyTimeout
    let currentStoryId
    let isPaused = false
    let startTime
    let elapsedTime = 0
    const textCharLimit = 30
    let isMobile = window.innerWidth <= 768

    // Detect if device is mobile
    function checkMobile() {
        isMobile = window.innerWidth <= 768
    }

    window.addEventListener('resize', checkMobile)
    checkMobile()

    // Switch to a specific image within a story
    function switchImage(storyElement, imageIndex) {
        // Update current image index
        currentImageIndex = imageIndex

        // Update active image
        const images = storyElement.querySelectorAll('.story-image')
        images.forEach(img => img.classList.remove('active'))
        images[imageIndex].classList.add('active')

        // Update active thumbnail
        const thumbnails = storyElement.querySelectorAll('.thumbnail')
        thumbnails.forEach(thumb => thumb.classList.remove('active'))
        thumbnails[imageIndex].classList.add('active')

        // Center the active thumbnail in the scroll view
        centerActiveThumbnail(storyElement)

        // Reset progress bar and timer
        initProgressBar()

        // For mobile, automatically resume playback after switching images
        if (isMobile) {
            resumeStoryProgress()
        }
    }

    // Center the active thumbnail in the scroll view
    function centerActiveThumbnail(storyElement) {
        const thumbnailsContainer = storyElement.querySelector('.story-thumbnails')
        if (!thumbnailsContainer) return

        const activeThumb = thumbnailsContainer.querySelector('.thumbnail.active')
        if (!activeThumb) return

        // Calculate the center position
        const containerWidth = thumbnailsContainer.offsetWidth
        const thumbLeft = activeThumb.offsetLeft
        const thumbWidth = activeThumb.offsetWidth

        // Calculate the scroll position that centers the thumbnail
        const scrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2)

        // Smoothly scroll to the calculated position
        thumbnailsContainer.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        })
    }

    // Create story elements
    function createStoryElements() {
        storiesContent.innerHTML = ""

        storiesData.forEach((story, index) => {
            const storyElement = document.createElement("div")
            storyElement.className = "story"
            storyElement.setAttribute("data-story-id", story.id)

            // Check if text needs to be truncated
            let textHtml
            if (story.text.length > textCharLimit) {
                textHtml = `
          <div class="story-text-container">
            <div class="story-text-content">
              <div class="truncated-text">${story.text.substring(0, textCharLimit)}...</div>
              <div class="full-text">${story.text}</div>
              <button class="read-more-btn">Ver mais</button>
              <button class="read-less-btn">Ver menos</button>
            </div>
          </div>
        `
            } else {
                textHtml = `
          <div class="story-text-container">
            <div class="story-text-content">
              <div class="full-text">${story.text}</div>
            </div>
          </div>
        `
            }

            // Create image gallery
            let imagesHtml = ''
            story.images.forEach((image, imgIndex) => {
                imagesHtml += `<img src="${image}" alt="${story.title} - Imagem ${imgIndex + 1}" class="story-image ${imgIndex === 0 ? 'active' : ''}" data-image-index="${imgIndex}">`
            })

            // Create thumbnails if there are multiple images
            let thumbnailsHtml = ''
            if (story.images.length > 1) {
                thumbnailsHtml = `
          <div class="story-thumbnails">
            ${story.images.map((image, imgIndex) => `
              <div class="thumbnail ${imgIndex === 0 ? 'active' : ''}" data-image-index="${imgIndex}">
                <img src="${image}" alt="Miniatura ${imgIndex + 1}">
              </div>
            `).join('')}
          </div>
        `
            }

            storyElement.innerHTML = `
        <div class="story-images-container">
          ${imagesHtml}
        </div>
        ${thumbnailsHtml}
        <div class="story-text">
          <h3>${story.title}</h3>
          ${textHtml}
        </div>
      `

            storiesContent.appendChild(storyElement)
        })

        // Add event listeners to "Ver mais" and "Ver menos" buttons
        document.querySelectorAll('.read-more-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation() // Prevent triggering other click events

                const textContainer = this.closest('.story-text-content')
                textContainer.classList.add('expanded')

                // Ensure story is paused when reading more
                pauseStoryProgress()
            })
        })

        document.querySelectorAll('.read-less-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation() // Prevent triggering other click events

                const textContainer = this.closest('.story-text-content')
                textContainer.classList.remove('expanded')

                // Resume story progress after clicking "Ver menos", especially important for mobile
                resumeStoryProgress()
            })
        })

        // Add event listeners to thumbnails
        document.querySelectorAll('.thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', function (e) {
                e.stopPropagation() // Prevent triggering other click events

                const imageIndex = parseInt(this.getAttribute('data-image-index'))
                const storyElement = this.closest('.story')

                // Switch to the selected image
                switchImage(storyElement, imageIndex)

                // For desktop, pause when clicking thumbnails
                // For mobile, we'll resume automatically in the switchImage function
                if (!isMobile) {
                    pauseStoryProgress()
                }
            })
        })
    }

    // Initialize progress bar
    function initProgressBar() {
        progressFill.style.width = "0%"
        elapsedTime = 0
    }

    // Start story progress
    function startStoryProgress() {
        if (isPaused) return

        startTime = Date.now() - elapsedTime
        const interval = 10 // Update every 10ms for smooth animation

        clearTimeout(storyTimeout)

        function updateProgress() {
            if (isPaused) return

            elapsedTime = Date.now() - startTime
            const progress = (elapsedTime / storyDuration) * 100

            if (progress >= 100) {
                progressFill.style.width = "100%"

                // Check if there are more images in the current story
                const currentStory = document.querySelector(".story.active")
                const images = currentStory.querySelectorAll(".story-image")

                if (currentImageIndex < images.length - 1) {
                    // Move to the next image in the same story
                    switchImage(currentStory, currentImageIndex + 1)
                    initProgressBar()
                    startStoryProgress()
                } else {
                    // Move to the next story
                    goToNextStory()
                }
            } else {
                progressFill.style.width = `${progress}%`
                storyTimeout = setTimeout(updateProgress, interval)
            }
        }

        updateProgress()
    }

    // Pause story progress
    function pauseStoryProgress() {
        isPaused = true
        clearTimeout(storyTimeout)
        // Store the current elapsed time when paused
        if (startTime) {
            elapsedTime = Date.now() - startTime
        }

        // Add visual indicator for paused state
        const activeStory = document.querySelector(".story.active")
        if (activeStory) {
            activeStory.classList.add("paused")
        }
    }

    // Resume story progress
    function resumeStoryProgress() {
        // Don't resume if a text is expanded
        const expandedText = document.querySelector(".story-text-content.expanded")
        if (expandedText) return

        isPaused = false

        // Remove visual indicator for paused state
        const activeStory = document.querySelector(".story.active")
        if (activeStory) {
            activeStory.classList.remove("paused")
        }

        startStoryProgress()
    }

    // Show story by index
    function showStory(index) {
        // Hide all stories
        const stories = document.querySelectorAll(".story")
        stories.forEach((story) => {
            story.classList.remove("active")

            // Reset any expanded texts
            const textContent = story.querySelector(".story-text-content")
            if (textContent) {
                textContent.classList.remove("expanded")
            }
        })

        // Show the current story
        if (stories[index]) {
            stories[index].classList.add("active")
            currentStoryId = stories[index].getAttribute("data-story-id")
            currentStoryIndex = index
            currentImageIndex = 0 // Reset image index when changing stories

            // Reset active image and thumbnail
            const currentStory = stories[index]
            const images = currentStory.querySelectorAll('.story-image')
            const thumbnails = currentStory.querySelectorAll('.thumbnail')

            images.forEach((img, i) => {
                img.classList.toggle('active', i === 0)
            })

            thumbnails.forEach((thumb, i) => {
                thumb.classList.toggle('active', i === 0)
            })

            // Center the active thumbnail
            centerActiveThumbnail(currentStory)

            initProgressBar()
            startStoryProgress()
        }
    }

    // Go to next story
    function goToNextStory() {
        if (currentStoryIndex < storiesData.length - 1) {
            showStory(currentStoryIndex + 1)
        } else {
            closeStories()
        }
    }

    // Go to previous story
    function goToPrevStory() {
        if (currentStoryIndex > 0) {
            showStory(currentStoryIndex - 1)
        }
    }

    // Open stories viewer
    function openStories(storyId) {
        createStoryElements()

        // Find the index of the story to show
        const storyIndex = storiesData.findIndex((story) => story.id === storyId)

        // Show the stories viewer
        storiesViewer.style.display = "flex"
        setTimeout(() => {
            storiesViewer.classList.add("active")
        }, 10)

        // Show the selected story
        showStory(storyIndex !== -1 ? storyIndex : 0)

        // Disable body scroll
        document.body.style.overflow = "hidden"

        // Add event listeners for pause/resume
        setupPauseResumeListeners()
    }

    // Setup pause/resume listeners
    function setupPauseResumeListeners() {
        const stories = document.querySelectorAll(".story")

        stories.forEach((story) => {
            // Pause on mouseenter or touch
            story.addEventListener("mouseenter", pauseStoryProgress)
            story.addEventListener("touchstart", pauseStoryProgress)

            // Resume on mouseleave or touch end
            story.addEventListener("mouseleave", function () {
                // Only resume if no text is expanded
                const expandedText = this.querySelector(".story-text-content.expanded")
                if (!expandedText) {
                    resumeStoryProgress()
                }
            })

            // For mobile, we need to handle touch events differently
            story.addEventListener("touchend", (e) => {
                // Don't resume if touching the expanded text
                if (e.target.closest(".story-text-content.expanded")) {
                    return
                }

                // Don't resume if touching thumbnails - we handle this separately
                if (e.target.closest(".thumbnail")) {
                    return
                }

                // For mobile, we want to resume playback after a short delay
                // This allows users to see what they tapped on before continuing
                if (isMobile) {
                    setTimeout(() => {
                        // Check again if there's expanded text before resuming
                        const expandedText = story.querySelector(".story-text-content.expanded")
                        if (!expandedText) {
                            resumeStoryProgress()
                        }
                    }, 300)
                } else {
                    resumeStoryProgress()
                }
            })
        })
    }

    // Close stories viewer
    function closeStories() {
        storiesViewer.classList.remove("active")
        setTimeout(() => {
            storiesViewer.style.display = "none"
        }, 300)

        // Clear timeout
        clearTimeout(storyTimeout)
        isPaused = false

        // Enable body scroll
        document.body.style.overflow = ""
    }

    // Add click event to story items
    storyItems.forEach((item) => {
        item.addEventListener("click", function () {
            const storyId = this.getAttribute("data-story-id")
            openStories(storyId)
        })
    })

    // Add click event to close button
    closeStoriesBtn.addEventListener("click", closeStories)

    // Add click events to navigation buttons
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation() // Prevent triggering story content click
        goToPrevStory()
    })

    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation() // Prevent triggering story content click
        goToNextStory()
    })

    // Add click event to stories content for navigation
    storiesContent.addEventListener("click", function (e) {
        // Don't do anything if clicking on read more button, expanded text, or thumbnails
        if (
            e.target.closest(".read-more-btn") ||
            e.target.closest(".read-less-btn") ||
            e.target.closest(".story-text-content.expanded") ||
            e.target.closest(".thumbnail")
        ) {
            return
        }

        // Toggle pause/resume on click
        if (isPaused) {
            resumeStoryProgress()
        } else {
            pauseStoryProgress()
        }

        // Only navigate if not clicking on the story text or thumbnails
        if (!e.target.closest(".story-text") && !e.target.closest(".story-thumbnails")) {
            const rect = this.getBoundingClientRect()
            const x = e.clientX - rect.left

            if (x < rect.width / 3) {
                // Check if there are previous images in the current story
                const currentStory = document.querySelector(".story.active")
                if (currentImageIndex > 0) {
                    // Move to the previous image in the same story
                    switchImage(currentStory, currentImageIndex - 1)
                    initProgressBar()
                    startStoryProgress()
                } else {
                    // Move to the previous story
                    goToPrevStory()
                }
            } else if (x > (rect.width / 3) * 2) {
                // Check if there are more images in the current story
                const currentStory = document.querySelector(".story.active")
                const images = currentStory.querySelectorAll(".story-image")

                if (currentImageIndex < images.length - 1) {
                    // Move to the next image in the same story
                    switchImage(currentStory, currentImageIndex + 1)
                    initProgressBar()
                    startStoryProgress()
                } else {
                    // Move to the next story
                    goToNextStory()
                }
            }
        }
    })

    // Close stories when clicking outside
    storiesViewer.addEventListener("click", function (e) {
        if (e.target === this) {
            closeStories()
        }
    })

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!storiesViewer.classList.contains("active")) return

        if (e.key === "ArrowLeft") {
            // Check if there are previous images in the current story
            const currentStory = document.querySelector(".story.active")
            if (currentImageIndex > 0) {
                // Move to the previous image in the same story
                switchImage(currentStory, currentImageIndex - 1)
                initProgressBar()
                startStoryProgress()
            } else {
                // Move to the previous story
                goToPrevStory()
            }
        } else if (e.key === "ArrowRight") {
            // Check if there are more images in the current story
            const currentStory = document.querySelector(".story.active")
            const images = currentStory.querySelectorAll(".story-image")

            if (currentImageIndex < images.length - 1) {
                // Move to the next image in the same story
                switchImage(currentStory, currentImageIndex + 1)
                initProgressBar()
                startStoryProgress()
            } else {
                // Move to the next story
                goToNextStory()
            }
        } else if (e.key === "Escape") {
            closeStories()
        } else if (e.key === " ") {
            // Space bar to toggle pause/resume
            if (isPaused) {
                resumeStoryProgress()
            } else {
                pauseStoryProgress()
            }
            e.preventDefault() // Prevent page scrolling
        }
    })
})