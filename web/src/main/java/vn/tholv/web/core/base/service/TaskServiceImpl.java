package vn.tholv.web.core.base.service;

import org.springframework.stereotype.Service;
import vn.tholv.web.core.base.entity.Task;
import vn.tholv.web.core.base.service.core.AbstractService;

@Service
public class TaskServiceImpl extends AbstractService<Task,Integer> implements TaskService{
    @Override
    protected void validateInsert(Task entity) {

    }

    @Override
    protected void validateUpdate(Task entity) {

    }
}
