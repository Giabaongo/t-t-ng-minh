// Mind Map Data Structure for Ho Chi Minh's Ideology on Socialism

export interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
}

export interface MindMapNode {
    id: string;
    title: string;
    children?: MindMapNode[];
    explanation: string;
    example: string;
    keyPoint: string;
    quiz?: QuizQuestion;
}

export interface Branch {
    id: string;
    title: string;
    color: string;
    icon: string;
    nodes: MindMapNode[];
    explanation: string;
    example: string;
    keyPoint: string;
    quiz?: QuizQuestion;
}

export const mindMapData: {
    center: { title: string; subtitle: string };
    branches: Branch[];
} = {
    center: {
        title: "TƯ TƯỞNG HỒ CHÍ MINH",
        subtitle: "VỀ CHỦ NGHĨA XÃ HỘI"
    },
    branches: [
        {
            id: "concept",
            title: "Khái niệm CNXH",
            color: "#FF6B6B",
            icon: "💡",
            explanation: "Theo Hồ Chí Minh, CNXH là chế độ xã hội ưu việt, lấy con người làm trung tâm, hướng tới sự phát triển toàn diện của mỗi cá nhân và cả cộng đồng.",
            example: "Bác từng nói: 'CNXH là làm sao cho dân giàu, nước mạnh' - đơn giản và thực tiễn.",
            keyPoint: "CNXH = Vì con người, do con người",
            quiz: {
                question: "Theo Hồ Chí Minh, CNXH lấy yếu tố nào làm trung tâm?",
                options: ["Kinh tế", "Con người", "Chính trị", "Quân sự"],
                correctIndex: 1
            },
            nodes: [
                {
                    id: "concept-1",
                    title: "CNXH là gì?",
                    explanation: "Là chế độ xã hội do nhân dân làm chủ, mọi người được sống trong hòa bình, tự do, hạnh phúc.",
                    example: "Như một ngôi nhà chung, mọi người đều có quyền và trách nhiệm chăm lo cho nó.",
                    keyPoint: "CNXH = Nhà chung của nhân dân",
                    quiz: {
                        question: "CNXH là chế độ xã hội do ai làm chủ?",
                        options: ["Nhà nước", "Nhân dân", "Đảng", "Quốc hội"],
                        correctIndex: 1
                    }
                },
                {
                    id: "concept-2",
                    title: "Dân giàu, nước mạnh",
                    explanation: "Mục tiêu cốt lõi: xây dựng một xã hội công bằng, dân chủ, văn minh.",
                    example: "GDP bình quân đầu người tăng, an sinh xã hội đảm bảo cho mọi người.",
                    keyPoint: "Dân giàu → Nước mạnh",
                    quiz: {
                        question: "Mục tiêu cốt lõi của CNXH theo Bác Hồ là gì?",
                        options: ["Phát triển công nghiệp", "Dân giàu, nước mạnh", "Hội nhập quốc tế", "Quốc phòng vững mạnh"],
                        correctIndex: 1
                    }
                },
                {
                    id: "concept-3",
                    title: "Bản chất nhân văn",
                    explanation: "CNXH Việt Nam đặt con người ở vị trí trung tâm, mọi chính sách đều hướng về phục vụ nhân dân.",
                    example: "Chính sách xóa đói giảm nghèo đã giúp hàng triệu người thoát nghèo.",
                    keyPoint: "Con người là gốc",
                    quiz: {
                        question: "Bản chất nhân văn của CNXH Việt Nam thể hiện qua việc đặt gì ở vị trí trung tâm?",
                        options: ["Đảng Cộng sản", "Con người", "Kinh tế", "Văn hóa"],
                        correctIndex: 1
                    }
                }
            ]
        },
        {
            id: "goals",
            title: "Mục tiêu CNXH",
            color: "#4ECDC4",
            icon: "🎯",
            explanation: "CNXH hướng tới xây dựng một xã hội không còn áp bức bóc lột, mọi người được sống ấm no, hạnh phúc, bình đẳng.",
            example: "Chương trình 'Nông thôn mới' đã cải thiện đáng kể đời sống nông dân.",
            keyPoint: "Mục tiêu = Hạnh phúc toàn dân",
            quiz: {
                question: "CNXH hướng tới xây dựng xã hội như thế nào?",
                options: ["Giàu có tối đa", "Không còn áp bức bóc lột", "Phát triển công nghiệp nặng", "Độc lập hoàn toàn"],
                correctIndex: 1
            },
            nodes: [
                {
                    id: "goals-1",
                    title: "Kinh tế phát triển",
                    explanation: "Xây dựng nền kinh tế độc lập, tự chủ, hội nhập quốc tế, phát triển bền vững.",
                    example: "Việt Nam từ nước nghèo trở thành nước xuất khẩu gạo hàng đầu thế giới.",
                    keyPoint: "Kinh tế = Nền tảng",
                    quiz: {
                        question: "Việt Nam đã trở thành nước đứng đầu thế giới về xuất khẩu mặt hàng nào?",
                        options: ["Cà phê", "Gạo", "Cao su", "Điều"],
                        correctIndex: 1
                    }
                },
                {
                    id: "goals-2",
                    title: "Đời sống ấm no",
                    explanation: "Mọi người dân được đảm bảo nhu cầu cơ bản: ăn, mặc, ở, học hành, khám chữa bệnh.",
                    example: "Bảo hiểm y tế toàn dân đã bao phủ trên 90% dân số.",
                    keyPoint: "Ấm no = Quyền con người",
                    quiz: {
                        question: "Bảo hiểm y tế toàn dân ở Việt Nam đã bao phủ bao nhiêu phần trăm dân số?",
                        options: ["Trên 70%", "Trên 80%", "Trên 90%", "100%"],
                        correctIndex: 2
                    }
                },
                {
                    id: "goals-3",
                    title: "Công bằng xã hội",
                    explanation: "Xóa bỏ áp bức bóc lột, mọi người bình đẳng trước pháp luật, được hưởng thành quả lao động của mình.",
                    example: "Chính sách ưu đãi cho vùng sâu, vùng xa, đồng bào dân tộc thiểu số.",
                    keyPoint: "Công bằng ≠ Cào bằng",
                    quiz: {
                        question: "Công bằng xã hội trong CNXH có nghĩa là gì?",
                        options: ["Mọi người được như nhau", "Bình đẳng trước pháp luật", "Chia đều tài sản", "Không có người giàu"],
                        correctIndex: 1
                    }
                }
            ]
        },
        {
            id: "characteristics",
            title: "Đặc trưng CNXH",
            color: "#45B7D1",
            icon: "⭐",
            explanation: "CNXH Việt Nam có những đặc trưng riêng về kinh tế, chính trị, văn hóa - đạo đức phù hợp với điều kiện đất nước.",
            example: "Kinh tế thị trường định hướng XHCN là mô hình độc đáo của Việt Nam.",
            keyPoint: "Đặc trưng = DNA của CNXH VN",
            quiz: {
                question: "Mô hình kinh tế nào là đặc trưng riêng của Việt Nam?",
                options: ["Kinh tế kế hoạch", "Kinh tế thị trường tự do", "Kinh tế thị trường định hướng XHCN", "Kinh tế hỗn hợp"],
                correctIndex: 2
            },
            nodes: [
                {
                    id: "char-1",
                    title: "Kinh tế: Phát triển LLSX",
                    explanation: "Phát triển lực lượng sản xuất, công nghiệp hóa, hiện đại hóa đất nước.",
                    example: "Các khu công nghiệp, khu chế xuất thu hút đầu tư nước ngoài.",
                    keyPoint: "LLSX = Động lực KT",
                    quiz: {
                        question: "LLSX trong đặc trưng kinh tế CNXH là viết tắt của gì?",
                        options: ["Lao lý sản xuất", "Lực lượng sản xuất", "Liên lạc sản xuất", "Lợi lộc sản xuất"],
                        correctIndex: 1
                    }
                },
                {
                    id: "char-2",
                    title: "Chính trị: Của dân, do dân, vì dân",
                    explanation: "Nhà nước pháp quyền XHCN, quyền lực thuộc về nhân dân.",
                    example: "Quốc hội do dân bầu, đại diện cho tiếng nói của nhân dân.",
                    keyPoint: "Dân làm chủ",
                    quiz: {
                        question: "Khẩu hiệu 'Của dân, do dân, vì dân' nói về lĩnh vực nào?",
                        options: ["Kinh tế", "Văn hóa", "Chính trị", "Giáo dục"],
                        correctIndex: 2
                    }
                },
                {
                    id: "char-3",
                    title: "Văn hóa - Đạo đức",
                    explanation: "Xây dựng con người mới XHCN: có đức, có tài, vừa hồng vừa chuyên.",
                    example: "Phong trào 'Học tập và làm theo tư tưởng, đạo đức Hồ Chí Minh'.",
                    keyPoint: "Con người mới = Hồng + Chuyên",
                    quiz: {
                        question: "'Vừa hồng vừa chuyên' có nghĩa là gì?",
                        options: ["Vừa đẹp vừa giỏi", "Vừa có đức vừa có tài", "Vừa khỏe vừa thông minh", "Vừa giàu vừa sang"],
                        correctIndex: 1
                    }
                }
            ]
        },
        {
            id: "driving-forces",
            title: "Động lực xây dựng",
            color: "#96CEB4",
            icon: "🚀",
            explanation: "Động lực xây dựng CNXH bao gồm nhiều yếu tố, trong đó nhân dân là động lực quyết định.",
            example: "Phong trào khởi nghiệp, đổi mới sáng tạo trong giới trẻ Việt Nam.",
            keyPoint: "Nhân dân = Động lực số 1",
            quiz: {
                question: "Động lực quyết định trong xây dựng CNXH là gì?",
                options: ["Đảng", "Nhân dân", "Nhà nước", "Khoa học kỹ thuật"],
                correctIndex: 1
            },
            nodes: [
                {
                    id: "force-1",
                    title: "Nhân dân là động lực quyết định",
                    explanation: "Mọi thành tựu đều do nhân dân tạo ra, nhân dân là chủ thể của sự phát triển.",
                    example: "Doanh nghiệp tư nhân đóng góp trên 40% GDP cả nước.",
                    keyPoint: "Dân là gốc",
                    quiz: {
                        question: "Doanh nghiệp tư nhân đóng góp bao nhiêu phần trăm GDP cả nước?",
                        options: ["Trên 20%", "Trên 30%", "Trên 40%", "Trên 50%"],
                        correctIndex: 2
                    }
                },
                {
                    id: "force-2",
                    title: "Kết hợp lợi ích cá nhân - tập thể",
                    explanation: "Hài hòa giữa lợi ích cá nhân và cộng đồng, khuyến khích làm giàu chính đáng.",
                    example: "Doanh nhân thành đạt đóng góp từ thiện, xây dựng trường học, bệnh viện.",
                    keyPoint: "Win-win: Cá nhân + Tập thể",
                    quiz: {
                        question: "CNXH khuyến khích làm giàu như thế nào?",
                        options: ["Bằng mọi cách", "Chính đáng", "Không khuyến khích", "Chỉ cho nhà nước"],
                        correctIndex: 1
                    }
                },
                {
                    id: "force-3",
                    title: "Vai trò Khoa học - Kỹ thuật",
                    explanation: "KHKT là then chốt để công nghiệp hóa, hiện đại hóa đất nước.",
                    example: "Chuyển đổi số quốc gia, ứng dụng AI, công nghệ 4.0 trong các ngành.",
                    keyPoint: "KHKT = Key Driver",
                    quiz: {
                        question: "Công nghệ 4.0 được ứng dụng trong xây dựng CNXH nhằm mục đích gì?",
                        options: ["Giảm chi phí", "Công nghiệp hóa, hiện đại hóa", "Xuất khẩu", "Thay thế lao động"],
                        correctIndex: 1
                    }
                }
            ]
        },
        {
            id: "pathway",
            title: "Con đường đi lên CNXH",
            color: "#FFEAA7",
            icon: "🛤️",
            explanation: "Việt Nam đi lên CNXH từ một nước nông nghiệp lạc hậu, phải trải qua thời kỳ quá độ lâu dài.",
            example: "Từ 1986 (Đổi mới), Việt Nam đã thoát khỏi khủng hoảng và phát triển mạnh mẽ.",
            keyPoint: "Con đường = Quá độ + Sáng tạo",
            quiz: {
                question: "Năm nào Việt Nam bắt đầu công cuộc Đổi mới?",
                options: ["1975", "1980", "1986", "1990"],
                correctIndex: 2
            },
            nodes: [
                {
                    id: "path-1",
                    title: "Quá độ từ nước nông nghiệp",
                    explanation: "Không qua giai đoạn TBCN, đi thẳng lên CNXH với nhiều khó khăn cần vượt qua.",
                    example: "Tỷ trọng nông nghiệp giảm từ 40% (1986) xuống còn 12% (2024).",
                    keyPoint: "Bỏ qua TBCN = Đường tắt",
                    quiz: {
                        question: "Việt Nam đi lên CNXH bằng cách nào?",
                        options: ["Qua giai đoạn TBCN", "Bỏ qua giai đoạn TBCN", "Theo mô hình Liên Xô", "Sao chép Trung Quốc"],
                        correctIndex: 1
                    }
                },
                {
                    id: "path-2",
                    title: "Phù hợp điều kiện Việt Nam",
                    explanation: "Vận dụng sáng tạo chủ nghĩa Mác-Lênin, không rập khuôn máy móc.",
                    example: "Kinh tế thị trường định hướng XHCN - mô hình 'Made in Vietnam'.",
                    keyPoint: "Sáng tạo = Linh hoạt",
                    quiz: {
                        question: "Việt Nam vận dụng chủ nghĩa Mác-Lênin như thế nào?",
                        options: ["Rập khuôn máy móc", "Sáng tạo phù hợp điều kiện", "Bỏ qua hoàn toàn", "Chỉ lấy một phần"],
                        correctIndex: 1
                    }
                },
                {
                    id: "path-3",
                    title: "Độc lập gắn liền CNXH",
                    explanation: "Không có độc lập dân tộc thì không thể xây dựng CNXH và ngược lại.",
                    example: "Việt Nam kiên quyết bảo vệ chủ quyền biển đảo trong hội nhập quốc tế.",
                    keyPoint: "Độc lập + CNXH = Một thể",
                    quiz: {
                        question: "Mối quan hệ giữa độc lập dân tộc và CNXH là gì?",
                        options: ["Không liên quan", "Gắn liền với nhau", "Mâu thuẫn nhau", "Tùy thuộc hoàn cảnh"],
                        correctIndex: 1
                    }
                }
            ]
        },
        {
            id: "party-state",
            title: "Vai trò Đảng & Nhà nước",
            color: "#DDA0DD",
            icon: "🏛️",
            explanation: "Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ - đây là cơ chế vận hành của CNXH Việt Nam.",
            example: "Nghị quyết Đại hội Đảng → Chính sách Nhà nước → Nhân dân thực hiện và giám sát.",
            keyPoint: "Đảng + Nhà nước + Dân = Tam giác quyền lực",
            quiz: {
                question: "Cơ chế vận hành CNXH Việt Nam gồm những yếu tố nào?",
                options: ["Đảng và Nhà nước", "Nhà nước và Nhân dân", "Đảng, Nhà nước, Nhân dân", "Chỉ có Đảng"],
                correctIndex: 2
            },
            nodes: [
                {
                    id: "role-1",
                    title: "Đảng lãnh đạo",
                    explanation: "Đảng CSVN là lực lượng lãnh đạo Nhà nước và xã hội, định hướng phát triển đất nước.",
                    example: "Nghị quyết về phát triển kinh tế số, chuyển đổi xanh của Đảng.",
                    keyPoint: "Đảng = Kim chỉ nam",
                    quiz: {
                        question: "Vai trò của Đảng CSVN trong hệ thống chính trị là gì?",
                        options: ["Thực thi pháp luật", "Lãnh đạo và định hướng", "Giám sát xã hội", "Quản lý kinh tế"],
                        correctIndex: 1
                    }
                },
                {
                    id: "role-2",
                    title: "Nhà nước quản lý",
                    explanation: "Nhà nước thể chế hóa đường lối của Đảng thành pháp luật, chính sách.",
                    example: "Luật Doanh nghiệp, Luật Đầu tư tạo môi trường kinh doanh thuận lợi.",
                    keyPoint: "Nhà nước = Bộ máy thực thi",
                    quiz: {
                        question: "Nhà nước thực hiện vai trò gì trong CNXH?",
                        options: ["Lãnh đạo", "Làm chủ", "Quản lý", "Giám sát"],
                        correctIndex: 2
                    }
                },
                {
                    id: "role-3",
                    title: "Nhân dân làm chủ",
                    explanation: "Nhân dân thực hiện quyền làm chủ thông qua dân chủ trực tiếp và gián tiếp.",
                    example: "Cử tri bầu đại biểu Quốc hội, tham gia góp ý xây dựng pháp luật.",
                    keyPoint: "Dân = Ông chủ thực sự",
                    quiz: {
                        question: "Nhân dân thực hiện quyền làm chủ thông qua hình thức nào?",
                        options: ["Chỉ dân chủ trực tiếp", "Chỉ dân chủ gián tiếp", "Cả trực tiếp và gián tiếp", "Không có quyền làm chủ"],
                        correctIndex: 2
                    }
                }
            ]
        }
    ]
};

export const getBranchColor = (branchId: string): string => {
    const branch = mindMapData.branches.find(b => b.id === branchId);
    return branch?.color || "#666";
};
