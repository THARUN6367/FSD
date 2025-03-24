<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
        <head>
            <title>Resume - Tharun B</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .container {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 60%;
                    margin: auto;
                }
                h2 {
                    color: #333;
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #007bff;
                    color: white;
                }
                ul {
                    list-style-type: square;
                    padding-left: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Resume - <xsl:value-of select="resume/personal_info/name"/></h2>
                
                <h3>Contact Information</h3>
                <p><strong>Location:</strong> <xsl:value-of select="resume/personal_info/location"/></p>
                <p><strong>Phone:</strong> <xsl:value-of select="resume/personal_info/contact/phone"/></p>
                <p><strong>Email:</strong> <xsl:value-of select="resume/personal_info/contact/email"/></p>
                <p><strong>GitHub:</strong> <a href="{resume/personal_info/contact/github}" target="_blank">
                    <xsl:value-of select="resume/personal_info/contact/github"/>
                </a></p>
                <p><strong>LinkedIn:</strong> <a href="{resume/personal_info/contact/linkedin}" target="_blank">
                    <xsl:value-of select="resume/personal_info/contact/linkedin"/>
                </a></p>

                <h3>Education</h3>
                <p><strong>Institution:</strong> <xsl:value-of select="resume/education/degree/institution"/></p>
                <p><strong>Program:</strong> <xsl:value-of select="resume/education/degree/program"/></p>
                <p><strong>Duration:</strong> <xsl:value-of select="resume/education/degree/duration"/></p>
                <p><strong>CGPA:</strong> <xsl:value-of select="resume/education/degree/cgpa"/></p>

                <h3>Work Experience</h3>
                <xsl:for-each select="resume/work_experience/job">
                    <p><strong>Company:</strong> <xsl:value-of select="company"/></p>
                    <p><strong>Role:</strong> <xsl:value-of select="role"/></p>
                    <p><strong>Duration:</strong> <xsl:value-of select="duration"/></p>
                    <ul>
                        <xsl:for-each select="responsibilities/task">
                            <li><xsl:value-of select="."/></li>
                        </xsl:for-each>
                    </ul>
                </xsl:for-each>

                <h3>Projects</h3>
                <xsl:for-each select="resume/projects/project">
                    <p><strong>Title:</strong> <xsl:value-of select="title"/></p>
                    <p><strong>Date:</strong> <xsl:value-of select="date"/></p>
                    <p><strong>Description:</strong> <xsl:value-of select="description"/></p>
                </xsl:for-each>

                <h3>Certifications</h3>
                <ul>
                    <xsl:for-each select="resume/certifications/certification">
                        <li><xsl:value-of select="."/></li>
                    </xsl:for-each>
                </ul>

                <h3>Skills</h3>
                <xsl:for-each select="resume/skills_and_interests/skill_category">
                    <p><strong><xsl:value-of select="category"/>:</strong> <xsl:value-of select="skills"/></p>
                </xsl:for-each>
            </div>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
