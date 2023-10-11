package vn.tholv.web.core.base.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.tholv.web.core.base.entity.core.BaseEntity;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project extends BaseEntity<Project, Integer> {
    private String name;
    private Timestamp startDate;
    private Number money;

    @ManyToOne
    @JoinColumn(name = "leader_id")
    private User leader;

    @OneToMany(mappedBy = "project")
    private List<User> memberList;

    @OneToMany(mappedBy = "project")
    private List<Task> taskList;
}
