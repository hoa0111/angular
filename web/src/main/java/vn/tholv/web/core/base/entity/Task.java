package vn.tholv.web.core.base.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.tholv.web.core.base.constant.TaskConst;
import vn.tholv.web.core.base.entity.core.BaseEntity;
@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task extends BaseEntity<Task, Integer> {
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private Integer status;
    private Integer priority;

    @Override
    protected void prePersist() {
        super.prePersist();
        this.status = TaskConst.OPEN_STATUS;
    }
}
