package com.iit.dbo.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "journal")
public class journal {
	@Id
	private String doc_id;
	private String j_name;
	private String j_pubid;
	private String j_type;
	public String getDoc_id() {
		return doc_id;
	}
	public void setDoc_id(String doc_id) {
		this.doc_id = doc_id;
	}
	public String getJ_name() {
		return j_name;
	}
	public void setJ_name(String j_name) {
		this.j_name = j_name;
	}
	public String getJ_pubid() {
		return j_pubid;
	}
	public void setJ_pubid(String j_pubid) {
		this.j_pubid = j_pubid;
	}
	public String getJ_type() {
		return j_type;
	}
	public void setJ_type(String j_type) {
		this.j_type = j_type;
	}
	@Override
	public String toString() {
		return "journal [doc_id=" + doc_id + ", j_name=" + j_name + ", j_pubid=" + j_pubid + ", j_type=" + j_type + "]";
	}

}
