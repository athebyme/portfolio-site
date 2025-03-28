import React, { useState, useEffect, useRef } from 'react';
import {
    Code, Database, Server, Terminal, User, Github, Mail,
    Phone, MapPin, Award, Calendar, MessageSquare, ExternalLink,
    Coffee, Cpu, Package, Box, Layers, Edit3, FileCode, Settings, Activity
} from 'lucide-react';

// Интерфейс для цветов технологий
interface TechColorMap {
    [key: string]: string;
}

const PortfolioSite: React.FC = () => {
    const [scrollY, setScrollY] = useState<number>(0);
    const [activeSection, setActiveSection] = useState<string>('hero');
    const [showCursor, setShowCursor] = useState<boolean>(true);

    // Refs for sections с правильной типизацией
    const heroRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);

    // Технологии и их иконки
    const techIcons: {[key: string]: React.ReactNode} = {
        "Go": <div className="w-6 h-6 flex items-center justify-center text-[#00ADD8] font-bold text-sm bg-gray-800 rounded-sm">Go</div>,
        "C#": <div className="w-6 h-6 flex items-center justify-center text-[#239120] font-bold text-sm bg-gray-800 rounded-sm">C#</div>,
        "Python": <div className="w-6 h-6 flex items-center justify-center text-[#3776AB] font-bold text-sm bg-gray-800 rounded-sm">Py</div>,
        "PostgreSQL": <div className="w-6 h-6 flex items-center justify-center text-[#336791] font-bold text-sm bg-gray-800 rounded-sm">Pg</div>,
        "Redis": <div className="w-6 h-6 flex items-center justify-center text-[#DC382D] font-bold text-sm bg-gray-800 rounded-sm">Rs</div>,
        "Kafka": <div className="w-6 h-6 flex items-center justify-center text-[#231F20] font-bold text-sm bg-gray-800 rounded-sm">Kf</div>,
        "Gin": <div className="w-6 h-6 flex items-center justify-center text-[#00ADD8] font-bold text-sm bg-gray-800 rounded-sm">Gin</div>,
        "ООП": <Box size={20} />,
        "SOLID": <Layers size={20} />,
        "GRASP": <Cpu size={20} />,
        "Гексагональная архитектура": <Settings size={20} />,
        "XUnit": <div className="w-6 h-6 flex items-center justify-center text-[#512BD4] font-bold text-sm bg-gray-800 rounded-sm">XU</div>,
        "Moq": <div className="w-6 h-6 flex items-center justify-center text-[#8A2BE2] font-bold text-sm bg-gray-800 rounded-sm">Mq</div>
    };

    // Цвета для технологий
    const techColors: TechColorMap = {
        "Go": "#00ADD8",
        "Python": "#3776AB",
        "C#": "#239120",
        "Postgres": "#336791",
        "PostgreSQL": "#336791",
        "Redis": "#DC382D",
        "Kafka": "#231F20",
        "Gin": "#00ADD8",
        "Telegram API": "#26A5E4",
        "Google Cloud API": "#4285F4",
        "Ozon API": "#005BE2",
        "KNN": "#FF6B6B",
        "ООП": "#9B4DCA",
        "SOLID": "#FF8C00",
        "GRASP": "#6A0DAD",
        "SOLID + GRASP": "#FF8C00",
        "XUnit": "#512BD4",
        "Moq": "#8A2BE2",
        "Гексагональная архитектура": "#6B46C1",
        "Crayon": "#FF9900"
    };

    // Функция для плавного скролла с эффектом easing
    const smoothScrollTo = (targetId: string): void => {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;
        const duration = 1000; // миллисекунды
        let startTime: number | null = null;

        // Функция easing (кубическая анимация: медленно-быстро-медленно)
        const easeInOutCubic = (t: number): number =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        const animation = (currentTime: number): void => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // Обработчик клика по навигационным ссылкам
    const handleNavClick = (e: React.MouseEvent, targetId: string): void => {
        e.preventDefault();
        smoothScrollTo(targetId);
    };

    // Handle scroll
    useEffect(() => {
        const handleScroll = (): void => {
            setScrollY(window.scrollY);

            // Determine active section
            const heroTop = heroRef.current?.getBoundingClientRect().top || 0;
            const aboutTop = aboutRef.current?.getBoundingClientRect().top || 0;
            const projectsTop = projectsRef.current?.getBoundingClientRect().top || 0;

            if (projectsTop < 300) {
                setActiveSection('projects');
            } else if (aboutTop < 300) {
                setActiveSection('about');
            } else {
                setActiveSection('hero');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animated typing effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => clearInterval(interval);
    }, []);

    // Project data
    const projects = [
        {
            year: "2025",
            title: "Сервис мониторинга статистики продавца",
            description: "Система для анализа и отслеживания показателей продаж на маркетплейсах",
            tech: ["Go", "Telegram API", "Postgres"],
            icon: <Database size={24} />,
            link: "https://github.com/athebyme/marketplace-monitoring"
        },
        {
            year: "2024",
            title: "Сервис работы с маркетплейсами",
            description: "Платформа для управления товарами и продажами через различные маркетплейсы",
            tech: ["Go", "Postgres"],
            icon: <Server size={24} />,
            link: "https://github.com/athebyme/marketplace-service"
        },
        {
            year: "2022-2023",
            title: "Парсер товаров для загрузки на маркетплейсы",
            description: "Инструмент для автоматического сбора данных о товарах и загрузки на Wildberries и Ozon",
            tech: ["Python", "Google Cloud API", "Ozon API", "KNN"],
            icon: <Code size={24} />,
            link: "https://github.com/athebyme/marketplace-parser"
        },
        {
            year: "2023",
            title: "Система работы банкомата с Postgres",
            description: "Симуляция банкомата с надежным сохранением данных и гексагональной архитектурой",
            tech: ["C#", "ООП", "SOLID + GRASP", "Гексагональная архитектура", "Postgres", "XUnit"],
            icon: <Terminal size={24} />,
            link: "https://github.com/athebyme/atm-system"
        },
        {
            year: "2023",
            title: "Оболочка файловой системы CLI",
            description: "Интерфейс командной строки для работы с файловой системой",
            tech: ["C#", "ООП", "SOLID + GRASP", "Moq", "XUnit"],
            icon: <Terminal size={24} />,
            link: "https://github.com/athebyme/cli-filesystem"
        },
        {
            year: "2023",
            title: "Система распределения сообщений",
            description: "Платформа для маршрутизации и обработки сообщений",
            tech: ["C#", "ООП", "SOLID + GRASP", "Crayon", "Moq", "XUnit"],
            icon: <MessageSquare size={24} />,
            link: "https://github.com/athebyme/message-distributor"
        }
    ];

    // Calculate dynamic styles
    const parallaxStyle = {
        transform: `translateY(${-scrollY * 0.1}px)`
    };

    return (
        <div className="bg-black text-white min-h-screen font-mono">
            {/* Floating particles background */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-gray-700 rounded-full opacity-20"
                        style={{
                            width: Math.random() * 10 + 2 + 'px',
                            height: Math.random() * 10 + 2 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `float ${Math.random() * 15 + 10}s linear infinite`
                        }}
                    />
                ))}
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-80 backdrop-blur-sm border-b border-gray-800">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-xl font-bold tracking-wider">
                        <span className="text-white">АНТОН</span>
                        <span className="text-gray-500">.БРЮХОВ</span>
                    </div>

                    <div className="flex space-x-6">
                        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className={`hover:text-gray-400 transition-colors ${activeSection === 'hero' ? 'text-white' : 'text-gray-500'}`}>Главная</a>
                        <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={`hover:text-gray-400 transition-colors ${activeSection === 'about' ? 'text-white' : 'text-gray-500'}`}>Обо мне</a>
                        <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={`hover:text-gray-400 transition-colors ${activeSection === 'projects' ? 'text-white' : 'text-gray-500'}`}>Проекты</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" ref={heroRef as React.RefObject<HTMLElement>} className="relative h-screen flex items-center">
                <div className="container mx-auto px-6 z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            <div className="text-gray-400 mb-2 relative">
                                Backend Developer
                                <span className={`absolute ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
                            </div>
                            <div className="text-7xl" style={parallaxStyle}>Антон Брюхов</div>
                        </h1>
                        <p className="text-gray-400 text-xl mb-8">
                            Создаю надежные и масштабируемые backend-решения
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#projects"
                                onClick={(e) => handleNavClick(e, 'projects')}
                                className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                            >
                                Посмотреть проекты
                            </a>
                            <a
                                href="#about"
                                onClick={(e) => handleNavClick(e, 'about')}
                                className="px-6 py-3 border border-white text-white font-medium hover:bg-white hover:text-black transition-colors"
                            >
                                Обо мне
                            </a>
                        </div>
                    </div>
                </div>

                {/* Abstract animated background shape */}
                <div
                    className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                        transform: `translate(${scrollY * 0.1}px, ${-scrollY * 0.05}px)`
                    }}
                />
            </section>

            {/* About Section */}
            <section id="about" ref={aboutRef as React.RefObject<HTMLElement>} className="py-24 border-t border-gray-800">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-16 text-center">Обо мне</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-900 rounded-lg">
                                    <User size={24} className="text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Профиль</h3>
                                    <p className="text-gray-400 whitespace-pre-wrap select-text">
                                        Стажер-разработчик Backend с сильным интересом к созданию масштабируемых сервисов и опытом работы с Go, C# и Python.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-900 rounded-lg">
                                    <Award size={24} className="text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Образование</h3>
                                    <p className="text-gray-400 whitespace-pre-wrap select-text">
                                        Университет ИТМО - Software Engineer<br />
                                        3 курс, 2022-2026
                                    </p>
                                    <p className="text-gray-500 mt-2 whitespace-pre-wrap select-text">
                                        Учебный центр вычислительной техники<br />
                                        Победитель ежегодных олимпиад, 2016-2021
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-900 rounded-lg">
                                    <Code size={24} className="text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Навыки</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {["Go", "Gin", "Redis", "Kafka", "PostgreSQL", "C#", "Python", "ООП", "SOLID", "GRASP", "Гексагональная архитектура", "XUnit", "Moq"].map((skill) => (
                                            <span key={skill} className="px-3 py-1 bg-gray-900 hover:bg-gray-800 transition-colors text-gray-300 text-sm rounded-full flex items-center space-x-1.5 group border border-gray-800">
                        <span className="text-gray-400 group-hover:text-white transition-colors">{techIcons[skill] || <Code size={16} />}</span>
                        <span>{skill}</span>
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-900 rounded-lg">
                                    <MapPin size={24} className="text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Местоположение</h3>
                                    <p className="text-gray-400 whitespace-pre-wrap select-text">Санкт-Петербург, Россия</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-gray-900 rounded-lg">
                                    <Calendar size={24} className="text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Дата рождения</h3>
                                    <p className="text-gray-400 whitespace-pre-wrap select-text">14 Августа 2004</p>
                                </div>
                            </div>

                            <a href="tel:+79052570161" className="flex items-start space-x-4 group hover:bg-gray-900 hover:bg-opacity-30 transition-colors p-2 rounded-lg -mx-2">
                                <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors">
                                    <Phone size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Телефон</h3>
                                    <p className="text-gray-400 whitespace-pre-wrap select-text group-hover:text-gray-300 transition-colors">+7 (905) 257 01 61</p>
                                </div>
                            </a>

                            <a href="mailto:ab@athebyme.ru" className="flex items-start space-x-4 group hover:bg-gray-900 hover:bg-opacity-30 transition-colors p-2 rounded-lg -mx-2">
                                <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors">
                                    <Mail size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Email</h3>
                                    <p className="text-gray-400 whitespace-pre-wrap select-text group-hover:text-gray-300 transition-colors">ab@athebyme.ru</p>
                                </div>
                            </a>

                            <a href="https://github.com/athebyme" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group hover:bg-gray-900 hover:bg-opacity-30 transition-colors p-2 rounded-lg -mx-2">
                                <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors">
                                    <Github size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">GitHub</h3>
                                    <p className="text-gray-400 whitespace-pre-wrap select-text group-hover:text-gray-300 transition-colors">github.com/athebyme</p>
                                </div>
                            </a>

                            <a href="https://t.me/athebyme" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-4 group hover:bg-gray-900 hover:bg-opacity-30 transition-colors p-2 rounded-lg -mx-2">
                                <div className="p-3 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors">
                                    <MessageSquare size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Telegram</h3>
                                    <p className="text-gray-400 whitespace-pre-wrap select-text group-hover:text-gray-300 transition-colors">@athebyme</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" ref={projectsRef as React.RefObject<HTMLElement>} className="py-24 border-t border-gray-800">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-16 text-center">Проекты</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-gray-600 transition-all group"
                                style={{
                                    transitionDelay: `${index * 50}ms`,
                                    transform: scrollY > 1000 ? 'translateY(0)' : 'translateY(20px)',
                                    opacity: scrollY > 1000 ? 1 : 0,
                                }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-black rounded-lg">
                                        {project.icon}
                                    </div>
                                    <span className="text-gray-500 text-sm">{project.year}</span>
                                </div>

                                <div className="flex items-center mb-2">
                                    <h3 className="text-xl font-bold mr-2 group-hover:text-white transition-colors">{project.title}</h3>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                <p className="text-gray-400 mb-4">{project.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span key={tech} className="px-3 py-2 mr-1 mb-1 inline-flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-sm border border-gray-800 text-gray-300 text-xs rounded-md hover:bg-gray-800 transition-colors group">
                      <span className="mr-2">{techIcons[tech] || <Code size={14} />}</span>
                      <span>{tech}</span>
                    </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-800">
                <div className="container mx-auto px-6 text-center">
                    <div className="text-xl font-bold tracking-wider mb-4">
                        <span className="text-white">АНТОН</span>
                        <span className="text-gray-500">.БРЮХОВ</span>
                    </div>

                    <p className="text-gray-500 mb-4">Стажер-разработчик Backend • Санкт-Петербург</p>

                    <div className="flex justify-center space-x-6 mb-6">
                        <a href="https://github.com/athebyme" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors group">
                            <div className="flex flex-col items-center">
                                <Github size={24} className="mb-2" />
                                <span className="text-sm group-hover:underline">GitHub</span>
                            </div>
                        </a>
                        <a href="https://t.me/athebyme" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors group">
                            <div className="flex flex-col items-center">
                                <MessageSquare size={24} className="mb-2" />
                                <span className="text-sm group-hover:underline">Telegram</span>
                            </div>
                        </a>
                        <a href="mailto:ab@athebyme.ru" className="text-gray-400 hover:text-white transition-colors group">
                            <div className="flex flex-col items-center">
                                <Mail size={24} className="mb-2" />
                                <span className="text-sm group-hover:underline">Email</span>
                            </div>
                        </a>
                        <a href="tel:+79052570161" className="text-gray-400 hover:text-white transition-colors group">
                            <div className="flex flex-col items-center">
                                <Phone size={24} className="mb-2" />
                                <span className="text-sm group-hover:underline">Телефон</span>
                            </div>
                        </a>
                    </div>

                    <p className="text-gray-600 text-sm">© {new Date().getFullYear()} - Антон Брюхов</p>
                </div>
            </footer>

            {/* Floating scroll indicator */}
            <div
                className={`fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center bg-white text-black rounded-full cursor-pointer transform transition-all hover:scale-110 ${scrollY > 300 ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                ↑
            </div>

            {/* CSS animations */}
            <style>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0) rotate(0); }
          33% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
          66% { transform: translateY(10px) translateX(-10px) rotate(-5deg); }
          100% { transform: translateY(0) translateX(0) rotate(0); }
        }
      `}</style>
        </div>
    );
};

export default PortfolioSite;