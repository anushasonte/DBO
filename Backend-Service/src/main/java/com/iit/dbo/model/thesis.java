package com.iit.dbo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "thesis")
public class thesis {
	private String t_name;
	private String t_author;

	@Id
	@Column(name = "doc_id", nullable = false)
	private String docid;
	private String t_category;
	private String t_pubid;
	
	public String getT_author() {
		return t_author;
	}
	public void setT_author(String t_author) {
		this.t_author = t_author;
	}
	public String getT_name() {
		return t_name;
	}
	public void setT_name(String t_name) {
		this.t_name = t_name;
	}
	
	public String getT_category() {
		return t_category;
	}
	public void setT_category(String t_category) {
		this.t_category = t_category;
	}
	public String getT_pubid() {
		return t_pubid;
	}
	public void setT_pubid(String t_pubid) {
		this.t_pubid = t_pubid;
	}
	public String getDocid() {
		return docid;
	}
	public void setDocid(String docid) {
		this.docid = docid;
	}
	@Override
	public String toString() {
		return "thesis [t_name=" + t_name + ", t_author=" + t_author + ", docid=" + docid + ", t_category=" + t_category
				+ ", t_pubid=" + t_pubid + "]";
	}
	
	

}
