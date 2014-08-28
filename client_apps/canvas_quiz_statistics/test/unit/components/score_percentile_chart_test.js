define(function(require) {
  var Subject = require('jsx!views/summary/score_percentile_chart');
  var testRects = function(bars) {
    bars.forEach(function(bar) {
      var index = bar.i;
      rect = find('rect.bar:nth-of-type(' + (index+1) + ')');
      expect(rect.x.baseVal.value).toEqual(bar.x, 'rect[' + index + '][x]');
      expect(rect.y.baseVal.value).toEqual(bar.y, 'rect[' + index + '][y]');
      expect(rect.height.baseVal.value).toEqual(bar.h, 'rect['+index+'][h]');
    });
  };

  describe('ScorePercentileChart', function() {
    this.reactSuite({
      type: Subject
    });

    it('should render', function() {});
    it('should render a bar for each percentile', function() {
      expect(findAll('rect.bar').length).toEqual(101);
    });

    it('bar height should be based on score frequency', function() {
      setProps({
        scores: {
          15: 1,
          25: 1,
          44: 1,
          50: 1,
          59: 2
        }
      });

      testRects([
        { i: 15, x: 187, y: 88, h: 92 },
        { i: 25, x: 277, y: 88, h: 92 },
        { i: 44, x: 448, y: 88, h: 92 },
        { i: 59, x: 583, y: -2, h: 182 },
      ]);
    });

    it('should update', function() {
      var rect;

      setProps({
        scores: {
          15: 1,
        }
      });

      testRects([
        { i: 15, x: 187, y: -2, h: 182 },
        { i: 25, x: 277, y: 178, h: 2 },
      ]);

      setProps({
        scores: {
          15: 1,
          25: 1,
        }
      });

      testRects([
        { i: 15, x: 187, y: -2, h: 182 },
        { i: 25, x: 277, y: -2, h: 182 },
      ]);
    });
  });
});