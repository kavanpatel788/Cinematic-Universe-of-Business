# Kavan Patel ka resume PDF create karne ke liye code
from fpdf import FPDF

class ResumePDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 20)
        self.set_text_color(22, 79, 71) # Dark Green color (Vishesh's style)
        self.cell(0, 10, 'KAVAN PATEL', ln=True, align='L')
        self.set_font('Arial', 'B', 14)
        self.set_text_color(46, 184, 114) # Light Green color
        self.cell(0, 10, 'Web Developer', ln=True, align='L')
        self.set_font('Arial', '', 10)
        self.set_text_color(0, 0, 0)
        self.cell(0, 5, '+91 6351470390  |  kavanpatel1330@gmail.com  |  Mahesana, IN 384002', ln=True)
        self.ln(5)

    def section_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.set_text_color(22, 79, 71)
        self.cell(0, 10, title.upper(), ln=True)
        self.line(self.get_x(), self.get_y(), self.get_x() + 190, self.get_y())
        self.ln(2)

    def body_text(self, text):
        self.set_font('Arial', '', 10)
        self.set_text_color(0, 0, 0)
        self.multi_cell(0, 5, text)
        self.ln(2)

pdf = ResumePDF()
pdf.add_page()

# Summary
pdf.section_title('Summary')
pdf.body_text('I am a dedicated web developer with a solid foundation in HTML, CSS, and JavaScript. I specialize in creating simple, responsive websites and am passionate about improving my skills through hands-on projects. I am proficient in using GitHub for project management and committed to delivering clean, user-focused web solutions.')

# Experience
pdf.section_title('Experience')
pdf.set_font('Arial', 'B', 11)
pdf.cell(0, 5, 'Web Developer - Personal Project', ln=True)
pdf.set_font('Arial', 'I', 10)
pdf.cell(0, 5, '11/2025 - Present | Kherva', ln=True)
pdf.body_text('• Built responsive web pages using HTML, CSS, and JavaScript.\n• Created core website layouts including Home, About, and Contact pages.\n• Improved UI design for mobile and desktop screens.\n• Utilized GitHub to upload and manage project files.')

# Education
pdf.section_title('Education')
pdf.set_font('Arial', 'B', 11)
pdf.cell(0, 5, 'Diploma - Ganpat University (2023)', ln=True)
pdf.cell(0, 5, 'Secondary Education - Urban Vidyalaya (2022)', ln=True)
pdf.ln(5)

# Skills
pdf.section_title('Skills')
pdf.body_text('HTML, CSS, JavaScript, Responsive Web Design, GitHub, UI/UX Design')

# Projects
pdf.section_title('Projects')
pdf.set_font('Arial', 'B', 11)
pdf.cell(0, 5, 'Cinematic Universe of Business', ln=True)
pdf.body_text('Engineered a modern movie information platform where users can explore trending films. Implemented a clean, responsive layout for seamless navigation.')

pdf.output('Kavan_Patel_Resume.pdf')
