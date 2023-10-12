package vn.tholv.web.core.base.entity.core;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import vn.tholv.web.core.override.util.CloneObject;

import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@SuppressWarnings("all")
public class BaseEntity<T, ID> extends CloneObject<T> implements Serializable {
    private static final long serialVersionUID = 1L;
    public static final String _id = "id";
    public static final String _createdDate = "createdDate";
    public static final String _modifiedDate = "modifiedDate";


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected ID id;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    protected Date createdDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    protected Date modifiedDate;

    public ID getId() {
        return id;
    }


    public Date getCreatedDate() {
        return createdDate;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    @PreUpdate
    protected void preUpdate() {
        modifiedDate = new Date();
    }

    @PrePersist
    protected void prePersist() {
        Date now = new Date();
        createdDate = now;
        modifiedDate = now;
    }
}
