/* 
 * Package Name: com.activescript.GUID
 * File Name: GUIDException.java
 * 
 * Created By: B.Boldbaatar
 * Created Date: 2011/02/11
 * 
 * History
 * ------------------------------------------------------------------------------
 * Date							Programmer						Description
 * ------------------------------------------------------------------------------
 * 2011/02/11 1.0.0 			B.Boldbaatar					Шинээр үүсгэв.
 * ------------------------------------------------------------------------------
 * 
 * ALL RIGHTS RESERVED COPYRIGHT (C) 2011 MCS ELECTRONICS CO.,LTD SOFTWARE DEPARTMENT
 */
package mn.mnba.mnba.util;

/**
 * @author  WoodcockS
 * @version 1.0
 */
public class GUIDException extends java.lang.Exception {

    /**
	 * 
	 */
	private static final long serialVersionUID = -296253541646450759L;


	/**
     * Creates new <code>GUIDException</code> without detail message.
     */
    public GUIDException() {
    }


    /**
     * Constructs an <code>GUIDException</code> with the specified detail message.
     * @param msg the detail message.
     */
    public GUIDException(String msg) {
        super(msg);
    }
}


