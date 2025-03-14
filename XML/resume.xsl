<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <html>
        <head>
            <title>Resume - Tharun B</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; }
                .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                h1, h2 { color: #333; }
                ul { list-style-type: none; padding: 0; }
                li { margin-bottom: 5px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1><xsl:value-of select="resume/name"/></h1>
                <h2>Contact Information</h2>
                <p>📍 Coimbatore</p>
                <p>📞 7418306367</p>
                <p>📧 tharun6367@gmail.com</p>
                <p>🔗 <a href="{resume/contact/github}">GitHub</a></p>
                <p>🔗 <a href="{resume/contact/linkedin}">LinkedIn</a></p>

                <h2>Summary</h2>
                <p><xsl:value-of select="resume/summary"/></p>

                <h2>Education</h2>
                <p><strong><xsl:value-of select="resume/education/degree"/></strong></p>
                <p><xsl:value-of select="resume/education/college"/> (CGPA: <xsl:value-of select="resume/education/cgpa"/>)</p>

                <h2>Experience</h2>
                <ul>
                    <xsl:for-each select="resume/experience/job">
                        <li>
                            <strong><xsl:value-of select="company"/></strong> - <xsl:value-of select="role"/>
                            (<xsl:value-of select="duration"/>)
                        </li>
                    </xsl:for-each>
                </ul>

                <h2>Projects</h2>
                <ul>
                    <xsl:for-each select="resume/projects/project">
                        <li><xsl:value-of select="."/></li>
                    </xsl:for-each>
                </ul>

                <h2>Skills</h2>
                <ul>
                    <li><strong>Languages:</strong> <xsl:value-of select="resume/skills/Programming Languages"/></li>
                    <li><strong>Web Development:</strong> <xsl:value-of select="resume/skills/Web Development"/></li>
                    <li><strong>Soft Skills:</strong> <xsl:value-of select="resume/skills/Version Control"/></li>
                    <li><strong>Soft Skills:</strong> <xsl:value-of select="resume/skills/Soft Skills"/></li>
                </ul>
            </div>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
