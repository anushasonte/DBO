package com.iit.dbo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "magazine_contributors")
public class magazine_contributors {
	private String m_name;
	@Id
	@Column(name = "doc_id", nullable = false)
	private String docid;
	private String m_contributor;
	public String getM_name() {
		return m_name;
	}
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}

	public String getM_contributor() {
		return m_contributor;
	}
	public void setM_contributor(String m_contributor) {
		this.m_contributor = m_contributor;
	}
	public String getDocid() {
		return docid;
	}
	public void setDocid(String docid) {
		this.docid = docid;
	}
	@Override
	public String toString() {
		return "magazine_contributors [m_name=" + m_name + ", docid=" + docid + ", m_contributor=" + m_contributor
				+ "]";
	}
	

}
