package vn.tholv.web.core.base.service;

import org.springframework.stereotype.Service;
import vn.tholv.web.core.base.entity.Project;
import vn.tholv.web.core.base.service.core.AbstractService;

import java.util.List;

@Service
public class ProjectServiceImpl extends AbstractService<Project,Integer> implements ProjectService{
    @Override
    protected void validateInsert(Project entity) {

    }

    @Override
    protected void validateUpdate(Project entity) {

    }

    @Override
    public List<Project> findAll() {
        List<Project> result = super.findAll();
        result.forEach(project -> {
            if(project.getMemberList() == null) project.setMemberCount(0);
            else project.setMemberCount(project.getMemberList().size());
        });
        return result;
    }
}
