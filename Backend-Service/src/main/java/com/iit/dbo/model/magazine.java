package com.iit.dbo.model;

public class magazine {
	private String m_name;
	private String doc_id;
	private String m_pubid;
	private String m_issues;
	private String m_type;
	public String getM_name() {
		return m_name;
	}
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	public String getDoc_id() {
		return doc_id;
	}
	public void setDoc_id(String doc_id) {
		this.doc_id = doc_id;
	}
	public String getM_pubid() {
		return m_pubid;
	}
	public void setM_pubid(String m_pubid) {
		this.m_pubid = m_pubid;
	}
	public String getM_issues() {
		return m_issues;
	}
	public void setM_issues(String m_issues) {
		this.m_issues = m_issues;
	}
	public String getM_type() {
		return m_type;
	}
	public void setM_type(String m_type) {
		this.m_type = m_type;
	}
	@Override
	public String toString() {
		return "magazine [m_name=" + m_name + ", doc_id=" + doc_id + ", m_pubid=" + m_pubid + ", m_issues=" + m_issues
				+ ", m_type=" + m_type + "]";
	}

}
