package vn.tholv.web.core.base.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.tholv.web.core.base.entity.core.BaseEntity;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project extends BaseEntity<Project, Integer> {
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private Date startDate;
    private Number money;

    @ManyToOne
    @JoinColumn(name = "leader_id")
    private User leader;

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    private List<User> memberList;

    @OneToMany(mappedBy = "project")
    @JsonIgnore
    private List<Task> taskList;

    @Transient
    private Integer memberCount;
}
