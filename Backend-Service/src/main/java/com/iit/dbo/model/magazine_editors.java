package com.iit.dbo.model;

public class magazine_editors {
	private String m_name;
	private String doc_id;
	private String m_editor;
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
	public String getM_editor() {
		return m_editor;
	}
	public void setM_editor(String m_editor) {
		this.m_editor = m_editor;
	}
	@Override
	public String toString() {
		return "magazine_editors [m_name=" + m_name + ", doc_id=" + doc_id + ", m_editor=" + m_editor + "]";
	}
	
}
