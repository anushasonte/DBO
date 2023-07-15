package com.iit.dbo.model;

import java.sql.Date;

public class publisher {
	private String pub_id;
	private String p_name;
	private Date p_publisheddate;
	private String p_address;
	public String getPub_id() {
		return pub_id;
	}
	public void setPub_id(String pub_id) {
		this.pub_id = pub_id;
	}
	public String getP_name() {
		return p_name;
	}
	public void setP_name(String p_name) {
		this.p_name = p_name;
	}
	public Date getP_publisheddate() {
		return p_publisheddate;
	}
	public void setP_publisheddate(Date p_publisheddate) {
		this.p_publisheddate = p_publisheddate;
	}
	public String getP_address() {
		return p_address;
	}
	public void setP_address(String p_address) {
		this.p_address = p_address;
	}
	@Override
	public String toString() {
		return "publisher [pub_id=" + pub_id + ", p_name=" + p_name + ", p_publisheddate=" + p_publisheddate
				+ ", p_address=" + p_address + "]";
	}

}
