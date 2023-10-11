package vn.tholv.web.core.base.service;

import org.springframework.stereotype.Service;
import vn.tholv.web.core.base.entity.Project;
import vn.tholv.web.core.base.service.core.AbstractService;

@Service
public class ProjectServiceImpl extends AbstractService<Project,Integer> implements ProjectService{
    @Override
    protected void validateInsert(Project entity) {

    }

    @Override
    protected void validateUpdate(Project entity) {

    }
}
