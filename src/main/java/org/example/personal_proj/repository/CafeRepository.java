package org.example.personal_proj.repository;

import org.example.personal_proj.entity.CafeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CafeRepository extends JpaRepository<CafeEntity, Long> {



    List<CafeEntity> findByIdx(Long idx);


    List<CafeEntity> findByOwnerIdx(Long idx);

    List<CafeEntity> findByTableCount_TableNum(Integer tableNum);

    // 특정 사용자가 등록한 모든 카페 목록을 조회하여 테이블 갯수와 예약된 인원도 가져옴

}

